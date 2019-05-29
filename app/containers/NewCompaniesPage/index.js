import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

import Breadcrumbs from '../../components/Breadcrumbs';

import CompanyItem from './components/CompanyItem';
import CompanyHead from './components/CompanyHead';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { updateCompanyById, deleteCompanyById } from './../EditCompanyPage/actions';

const url = 'company';

const TopPanel = () => (
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
);

class CompaniesPage extends Component {
  constructor(props) {
    super(props);

    this.actions = {
      edit: this.editCompany,
      deleteItem: this.deleteCompany,
      changeStatus: this.changeStatus
    };
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

  render() {
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

        <ExtraAwesomeList
          item={CompanyItem}
          head={CompanyHead}
          actions={this.actions}
          url={url}
          defaultQuery={{ _sort: 'updatedAt:desc' }}
          TopPanel={TopPanel}
          searchBy="company_name"
          tab
        />
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  push: PropTypes.func.isRequired,
  updateCompanyById: PropTypes.func.isRequired,
  deleteCompanyById: PropTypes.func.isRequired
};

export default connect(null, {
  push, updateCompanyById, deleteCompanyById
})(CompaniesPage);
