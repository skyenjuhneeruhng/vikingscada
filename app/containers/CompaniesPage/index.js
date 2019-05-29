import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { confirm } from '../../components/Modal/util/confirm';

import Breadcrumbs from '../../components/Breadcrumbs';

import Input from '../../components/UIKit/Input';
import CompanyList from './components/CompanyList';
import Pagination from '../../components/Pagination';
import NumberPerPage from '../../components/NumberPerPage';

import { getCompanies } from './actions';
import { updateCompanyById, deleteCompanyById } from './../EditCompanyPage/actions';

class CompaniesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentWillMount() {
    const { _start, _limit } = this.props;
    const page = Math.ceil(_start / _limit) + 1;
    this.updatePageData(page);
  }

  onPage = (num) => {
    this.updatePageData(num);
  }

  updatePageData(page = 1) {
    const { search } = this.state;
    const { _limit, _sort } = this.props;

    const query = {
      _start: _limit * (page - 1),
      _limit,
      _sort
    };
    if (search !== '') {
      query.company_name_contains = search;
    }

    this.props.getCompanies(query);
  }

  sortByTitle = (name) => {
    const { _start, _limit, _sort } = this.props;
    const { search } = this.state;
    const [sortName, sortType] = _sort.split(':');

    const newSort = sortName === name && sortType === 'asc' ? `${name}:desc` : `${name}:asc`;

    const query = {
      _start,
      _limit,
      _sort: newSort
    };

    if (search !== '') {
      query.company_name_contains = search;
    }

    this.props.getCompanies(query);
  }

  editCompany = (id) => {
    this.props.push(`/company/${id}/details`);
  }

  deleteCompany = (id) => {
    confirm('Are you sure, that you want to delete this company?').then(() => {
      this.props.deleteCompanyById(id);
    }, () => {
    });
  }

  changeStatus = (id, status) => {
    this.props.updateCompanyById(id, { status });
  }

  updateSearch = (e) => {
    const searchValue = e.target.value;
    this.setState({
      search: searchValue
    }, this.fetchSearchData);
  }

  fetchSearchData = () => {
    const { search } = this.state;
    if (search === '') {
      this.updatePageData();
    } else {
      this.props.getCompanies({
        company_name_contains: search,
        _start: 0
      });
    }
  }

  updateLimit = (limit) => {
    const validLimit = +limit || 10;
    const {
      _start, _sort, _limit, total
    } = this.props;

    const prevMaxPage = Math.ceil(total / _limit);
    const newMaxPage = Math.ceil(total / validLimit);

    let guessedPage = 0;
    if (newMaxPage < prevMaxPage) {
      const currentPage = (_start / _limit) + 1;
      const currentPageFactor = currentPage / prevMaxPage;
      guessedPage = Math.round(newMaxPage * currentPageFactor) - 1;
    }

    this.props.getCompanies({
      _limit: validLimit,
      _start: guessedPage > 0 ? guessedPage * validLimit : 0,
      _sort
    });
  }

  render() {
    const { _start, _limit, total } = this.props;

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Companies
              </h3>
              <Breadcrumbs current="Companies" />
            </div>
          </div>
        </div>


        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb">
                <div className="m-portlet__head">
                  <div className="m-form m-form--label-align-right m--margin-top-30 m--margin-bottom-30">
                    <div className="row align-items-center">
                      <div className="col-md-8 order-2 order-md-1">
                        <div className="form-group m-form__group row align-items-center">
                          <div className="col-md-4">
                            <div className="m-input-icon m-input-icon--left">
                              <Input
                                placeholder="Search"
                                icon="la la-search"
                                value={this.state.search}
                                type="text"
                                className="searsh"
                                onChange={this.updateSearch}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 order-1 order-md-2 m--align-right">
                        <Link to="../new-company" className="btn btn-warning m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill">
                          <span>
                            <i className="la la-plus" />
                            <span>
                              New Company
                            </span>
                          </span>
                        </Link>
                        <div className="m-separator m-separator--dashed d-md-none" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-portlet__body">
                  <div className="m_datatable m-datatable m-datatable--default m-datatable--subtable  m-datatable--loaded" id="local_data">
                    <CompanyList
                      companies={this.props.companies}
                      editCompany={this.editCompany}
                      deleteCompany={this.deleteCompany}
                      sortByTitle={this.sortByTitle}
                      changeStatus={this.changeStatus}
                      sort={this.props._sort}
                    />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  getCompanies: PropTypes.func,
  updateCompanyById: PropTypes.func,
  deleteCompanyById: PropTypes.func,
  push: PropTypes.func,
  companies: PropTypes.instanceOf(Array),
  total: PropTypes.number,
  _start: PropTypes.number,
  _limit: PropTypes.number,
  _sort: PropTypes.string
};

CompaniesPage.DefaultTypes = {
  getCompanies() { },
  updateCompanyById() { },
  deleteCompanyById() { },
  push() { },
  companies: [],
  total: 0,
  _start: 0,
  _limit: 0,
  _sort: ''
};

function mapStateToProps(state) {
  return {
    companies: state.companies && state.companies.list,
    total: state.companies && state.companies.total,
    _start: state.companies && state.companies._start,
    _limit: state.companies && state.companies._limit,
    _sort: state.companies && state.companies._sort
  };
}

export default connect(mapStateToProps, {
  getCompanies, updateCompanyById, deleteCompanyById, push
})(CompaniesPage);
