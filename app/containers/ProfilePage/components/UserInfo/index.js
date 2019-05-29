import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { confirm } from '../../../../components/Modal/util/confirm';
import Pagination from '../../../../components/Pagination';
import NumberPerPage from '../../../../components/NumberPerPage';

import UsersList from '../UsersList';
import EditProfile from './../../../EditProfilePage/components/EditProfile';

import { getCompanies } from '../../../CompaniesPage/actions';
import { updateCompanyStatusById, deleteCompanyById } from '../../../EditCompanyPage/actions';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    if (this.props.type === 'root') {
      const { _start, _limit } = this.props;
      const page = Math.ceil(_start / _limit) + 1;
      this.updatePageData(page);
    }
  }

  onPage = (num) => {
    this.updatePageData(num);
  }

  updatePageData(page = 1) {
    const { _limit, _sort } = this.props;
    this.props.getCompanies({
      _start: _limit * (page - 1),
      status: 'pending',
      _limit,
      _sort
    });
  }

  sortByTitle = (name) => {
    const { _start, _limit, _sort } = this.props;
    const [sortName, sortType] = _sort.split(':');
    const newSort = sortName === name && sortType === 'asc' ? `${name}:desc` : `${name}:asc`;
    this.setState({
      search: ''
    });

    this.props.getCompanies({
      _start,
      _limit,
      status: 'pending',
      _sort: newSort
    });
  }

  editCompany = (id) => {
    this.props.push(`/company/${id}/details`);
  }

  deleteCompany = (id) => {
    confirm('Are you sure, that you want to delete this company?').then(() => {
      this.props.deleteCompanyById(id, '/');
    }, () => {
    });
  }

  changeStatus = (id, status) => {
    this.props.updateCompanyStatusById(id, { status });
  }

  updateLimit = (limit) => {
    const validLimit = limit || 10;

    const { _start, _sort } = this.props;
    this.props.getCompanies({
      _limit: +validLimit,
      _start,
      status: 'pending',
      _sort
    });
  }

  clickTabs = (e) => {
    e.preventDefault();
  }

  renderWaitingForApproval() {
    const { _start, _limit, total } = this.props;
    return (
      <Fragment>
        <UsersList
          companies={this.props.companies}
          editCompany={this.editCompany}
          deleteCompany={this.deleteCompany}
          sortByTitle={this.sortByTitle}
          changeStatus={this.changeStatus}
          sort={this.props._sort}
        />
        {
          this.props.total > 10 ?
            <div className="m-datatable__pager m-datatable--paging-loaded clearfix">
              <Pagination
                limit={this.props._limit}
                skip={this.props._start}
                total={this.props.total}
                onPage={this.onPage}
              />
              <NumberPerPage
                start={_start + 1}
                limit={_limit}
                total={total}
                onChange={this.updateLimit}
              />
            </div> : null
          }
      </Fragment>
    );
  }

  renderTabTitle(type) {
    if (type === 'root') {
      return 'Waiting for Approval';
    }
    // return 'My sites';
    return 'My Profile';
  }
  renderTabContent(type, profile) {
    if (type === 'root') {
      return this.renderWaitingForApproval();
    }
    return <EditProfile cancel={false} formName="EditProfileFormTab" data={profile} />;
  }

  render() {
    const {
      type, profile
    } = this.props;

    const shortList = this.props.companies && this.props.companies.length > 2 ? 'full-list' : null;

    return (
      <Fragment>
        <div className="m-portlet__head">
          <div className="m-portlet__head-tools">
            <ul className="nav nav-tabs m-tabs m-tabs-line   m-tabs-line--left m-tabs-line--primary" role="tablist">
              <li className="nav-item m-tabs__item">
                <a className="nav-link m-tabs__link active" data-toggle="tab" href="/" role="tab" onClick={this.clickTabs}>
                  {this.renderTabTitle(type)}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="m-portlet__body">
          <div className={`tab-content m_datatable m-datatable m-datatable--default m-datatable--subtable m-datatable--loaded ${shortList}`}>
            {this.renderTabContent(type, profile)}
          </div>
        </div>
      </Fragment>
    );
  }
}

UserInfo.propTypes = {
  type: PropTypes.string,
  getCompanies: PropTypes.func,
  updateCompanyStatusById: PropTypes.func,
  deleteCompanyById: PropTypes.func,
  push: PropTypes.func,
  companies: PropTypes.instanceOf(Array),
  profile: PropTypes.instanceOf(Array),
  total: PropTypes.number,
  _start: PropTypes.number,
  _limit: PropTypes.number,
  _sort: PropTypes.string
};

UserInfo.defaultProps = {
  type: '',
  getCompanies: () => {},
  updateCompanyStatusById: () => {},
  deleteCompanyById: () => {},
  push: () => {},
  companies: [],
  profile: [],
  total: 0,
  _start: 0,
  _limit: 10,
  _sort: ''
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    companies: state.companies && state.companies.list,
    total: state.companies && state.companies.total,
    _start: state.companies && state.companies._start,
    _limit: state.companies && state.companies._limit,
    _sort: state.companies && state.companies._sort
  };
}

export default connect(mapStateToProps, {
  getCompanies, deleteCompanyById, push, updateCompanyStatusById
})(UserInfo);
