import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

// import { getCompany } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import DashboardItem from './components/DashboardItem';
import DashboardHead from './components/DashboardHead';

import AddDashboardForm from './addDashboardForm';
import EditDashboardForm from './editDashboardForm';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

import AwesomeList from './../AwesomeList';

import { getDashboardsList, addDashboard, editDashboard, deleteDashboard } from './actions';

class DashboardsList extends Component {
  constructor(props) {
    super(props);

    this.url = props.profile.role && props.profile.role.type === 'root' ?
      'dashboard' :
      `account/dashboard/${props.match.params && props.match.params.id}`;

    this.actions = {
      edit: this.editSite,
      openDashboard: this.openDashboard,
      deleteItem: this.deleteSite
    };

    this.state = {
      showAddDashboard: false,
      showEditDashboard: false,
      editing: {}
    };
  }

  componentDidMount() {
    this.props.getDashboardsList(
      this.props.profile.role && this.props.profile.role.type === 'root' ? `dashboard?site=${this.props.match.params.id}` : this.url,
      {}
    );
  }

  onAddDashboard = (values) => {
    this.hideAddForm();
    this.props.addDashboard(
      this.url,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values
    );
  }

  onEditDashboard = (values) => {
    const { id } = this.state.editing;
    this.setState({
      showEditDashboard: false,
      editing: {}
    }, () => this.props.editDashboard(this.url, id, values));
  }

  editSite = (id) => {
    const dashboard = this.props.dashboards.filter((item) => item.id === id)[0];
    this.setState({
      showEditDashboard: true,
      editing: {
        name: dashboard.name,
        id
      }
    });
  }

  openDashboard = (id) => {
    this.props.push(`/dashboard/${this.props.match.params.id}-${id}`);
    this.props.changeDefaultIndex(1);
  }

  deleteSite = (id) => {
    confirm('Are you sure, that you want to delete this dashboard?').then(() => {
      this.props.deleteDashboard(this.url, id);
    }, () => {
    });
  }

  showAddForm = () => {
    this.setState({
      showAddDashboard: true
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddDashboard: false
    });
  }

  hideEditForm = () => {
    this.setState({
      showEditDashboard: false,
      editing: {}
    });
  }

  returnLink() {
    const {
      profile, dashboards, company
    } = this.props;
    const dashboard = dashboards[0];
    const companyId = dashboard ? dashboard.site.company : company.id;
    return profile.role && profile.role.type === 'root' ?
      [{
        label: 'Companies',
        link: 'companies'
      },
      ...(companyId ? [{
        label: `${company.name} Sites`,
        link: `company/${companyId}/sites`
      }] : [])] :
      [{
        label: 'Sites',
        link: 'company/sites'
      }];
  }

  shame() {
    return (
      <div className="col-md-8 order-2 order-md-1">
        <div className="form-group m-form__group row align-items-center">
          <div className="col-md-4">
            <div className="m-input-icon m-input-icon--left" />
          </div>
        </div>
      </div>
    );
  }

  renderGoTo() {
    return (
      <div className="col-md-4 order-1 order-md-2 m--align-right">
        <div className="m-separator m-separator--dashed d-md-none" />
        <Link to="../new-site" className="btn btn-warning m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill">
          <span>
            Go To Dashboard
          </span>
        </Link>
      </div>
    );
  }

  renderAddButton() {
    const { role, site_manager } = this.props.profile || {};
    return ((role && role.type) === 'company' || (role && role.type) === 'root' || ((role && role.type) === 'managers' && this.props.match.params.id === site_manager.id)) && (
      <div className="col-md-4 order-1 order-md-2 m--align-right">
        <a
          role="button"
          onClick={this.showAddForm}
          className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
        >
          <span>
            <i className="la la-plus" />
            <span>
              Add Dashboard
            </span>
          </span>
        </a>
        <div className="m-separator m-separator--dashed d-md-none" />
      </div>
    );
  }

  render() {
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Dashboards
              </h3>
              <Breadcrumbs pages={this.returnLink()} current="Dashboards" />
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
                      {this.shame()}
                      {this.renderAddButton()}
                    </div>
                  </div>
                </div>
                <div className="m-portlet__body">
                  <div className="m_datatable m-datatable m-datatable--default m-datatable--subtable  m-datatable--loaded" id="local_data">
                    <AwesomeList
                      className="dashboards-list"
                      item={DashboardItem}
                      head={DashboardHead}
                      actions={this.actions}
                      data={this.props.dashboards}
                      defaultQuery={{ _sort: 'name:asc' }}
                      headData={{ siteId: this.props.match.params && this.props.match.params.id }}
                    />
                    {/* <div className="row align-items-center">
                      {this.shame()}
                      {this.renderGoTo()}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AddDashboardForm
          show={this.state.showAddDashboard}
          onSubmit={this.onAddDashboard}
          hide={this.hideAddForm}
        />

        <EditDashboardForm
          show={this.state.showEditDashboard}
          onSubmit={this.onEditDashboard}
          hide={this.hideEditForm}
          name={this.state.editing.name}
        />
      </div>
    );
  }
}

DashboardsList.propTypes = {
  dashboards: PropTypes.instanceOf(Object),
  company: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  push: PropTypes.func,
  addDashboard: PropTypes.func,
  editDashboard: PropTypes.func,
  deleteDashboard: PropTypes.func,
  getDashboardsList: PropTypes.func,
  changeDefaultIndex: PropTypes.func
};

DashboardsList.defaultProps = {
  dashboards: {},
  profile: {},
  match: {},
  push() {},
  addDashboard() {},
  editDashboard() {},
  deleteDashboard() {},
  getDashboardsList() {},
  changeDefaultIndex() {}
};

function mapStateToProps(state) {
  return {
    dashboards: state.dashboards && state.dashboards.list,
    company: {
      name: state.company.company.company_name || '',
      id: state.company.company.id || null
    }
  };
}

export default connect(mapStateToProps, {
  push, getDashboardsList, addDashboard, editDashboard, deleteDashboard, changeDefaultIndex
})(DashboardsList);
