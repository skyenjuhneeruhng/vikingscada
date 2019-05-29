import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import { confirm } from '../../../../components/Modal/util/confirm';

import SiteItem from './components/SiteItem';
import SiteHead from './components/SiteHead';

import ExtraAwesomeList from './../../../ExtraAwesomeList';

import { deleteEntityById } from './../../../NewBasePage/actions';

const TopPanel = (companyId) => () => (
  <div className="col-md-4 order-1 order-md-2 m--align-right">
    <Link
      className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
      to={{
        pathname: `/new-site/${companyId ? companyId : ''}`,
        state: { companyId }
      }}
    >
      <span>
        <i className="la la-plus" />
        <span>
          Site
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
      openDashboards: this.openDashboards,
      edit: this.editSite,
      deleteItem: this.deleteSite
    };

    let companyId = null;
    if (props.role === 'root') {
      this.url = `site?company=${props.id}`;
      companyId = props.id;
    } else {
      this.url = 'account/site';
    }

    this.TopPanelComponent = TopPanel(companyId);
  }

  openDashboards = (id) => {
    this.props.push(`/dashboards/${id}`);
  }

  editSite = (id) => {
    this.props.push(`/site/${id}`);
  }

  deleteSite = (id) => {
    confirm('Are you sure, that you want to delete this site?').then(() => {
      this.props.deleteEntityById(
        id,
        this.props.role === 'root' ? 'site' : 'account/site',
        this.props.role === 'root' ? `/company/${this.props.id}/sites` : '/company/sites'
      );
    }, () => {
    });
  }

  render() {
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies tabs-body">
        <ExtraAwesomeList
          className="sites-list"
          item={SiteItem}
          head={SiteHead}
          actions={this.actions}
          url={this.url}
          defaultQuery={{ _sort: 'name:asc' }}
          TopPanel={
            (this.props.role === 'company' || this.props.role === 'root') ? this.TopPanelComponent : Fragment
          }
          searchBy="name"
        />
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  push: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  deleteEntityById: PropTypes.func.isRequired
};

export default connect(null, {
  push, deleteEntityById
})(CompaniesPage);
