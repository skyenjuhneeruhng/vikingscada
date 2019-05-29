import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

import Breadcrumbs from '../../components/Breadcrumbs';

import SiteItem from './components/SiteItem';
import SiteHead from './components/SiteHead';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { deleteEntityById } from './../NewBasePage/actions';

const url = 'site';

const TopPanel = () => (
  <div className="col-md-4 order-1 order-md-2 m--align-right">
    <Link to="../new-site" className="btn btn-warning m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill">
      <span>
        <i className="la la-plus" />
        <span>
          New Site
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
      edit: this.editSite,
      deleteItem: this.deleteSite
    };
  }

  editSite = (id) => {
    this.props.push(`/site/${id}`);
  }

  deleteSite = (id) => {
    confirm('Are you sure, that you want to delete this site?').then(() => {
      this.props.deleteEntityById(id, url, `company/${this.props.match.params.id}`);
    }, () => {
    });
  }

  render() {
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Sites
              </h3>
              <Breadcrumbs current="Sites" />
            </div>
          </div>
        </div>

        <ExtraAwesomeList
          className="sites-list"
          item={SiteItem}
          head={SiteHead}
          actions={this.actions}
          url={url}
          defaultQuery={{ _sort: 'name:asc' }}
          TopPanel={TopPanel}
          searchBy="name"
          tab
        />
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  push: PropTypes.func.isRequired,
  deleteEntityById: PropTypes.func.isRequired
};

export default connect(null, {
  push, deleteEntityById
})(CompaniesPage);
