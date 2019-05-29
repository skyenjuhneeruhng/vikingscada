import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loadable from 'react-loading-overlay';

import { confirm } from '../../components/Modal/util/confirm';

// import { getCompany } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import GatewayItem from './components/GatewayItem';
import GatewayHead from './components/GatewayHead';

import TopPanel from './components/TopPanel';

import AddGatewayForm from './addGatewayForm';
import EditGatewayForm from './editGatewayForm';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { getGatewaysList, addGateway, editGateway, deleteGateway } from './actions';
import { getEntityById } from '../NewBasePage/actions';

class GatewayList extends Component {
  constructor(props) {
    super(props);

    const { profile, match } = props;

    this.url = profile && profile.role && profile.role.type === 'root' ?
      'gateway' :
      `account/gateway/${match && match.params && match.params.id}`;

    this.actions = {
      edit: this.editGateway,
      // openGateway: this.openGateway,
      deleteItem: this.deleteGateway
    };

    this.state = {
      isLoad: false,
      showAddGateway: false,
      showEditGateway: false,
      editing: {}
    };
  }

  componentDidMount() {
    const type = this.props.profile && this.props.profile.role && this.props.profile.role.type;
    const id = this.props.match && this.props.match.params && this.props.match.params.id;
    this.props.getGatewaysList(
      this.url,
      this.props.profile.role.type === 'root' ?
        { site: this.props.match.params.id } :
        {},
    );

    if (_.isEmpty(this.props.site)) {
      let route = 'site';
      switch (type) {
        case 'company': route = 'account/site'; break;
        case 'managers': route = 'account/site/me'; break;
        default: route = 'site';
      }
      this.props.getEntityById(
        type === 'managers' ? '' : id || '',
        route
      );
    }
  }

  onAddGateway = (values) => {
    this.hideAddForm();
    this.showPreloader();
    this.props.addGateway(
      this.url,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    );
  }

  onEditGateway = (values) => {
    const { id } = this.state.editing;
    this.setState({
      showEditGateway: false,
      editing: {}
    }, () => this.props.editGateway(this.url,
      id,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    ));
  }

  editGateway = (id) => {
    const gateway = this.props.gateways.filter((item) => item.id === id)[0];
    this.setState({
      showEditGateway: true,
      editing: {
        name: gateway.name,
        desc: gateway.desc,
        site: id,
        id
      }
    });
  }

  // openDashboard = (id) => {
  //   this.props.push(`/dashboard/${this.props.match.params.id}-${id}`);
  //   this.props.changeDefaultIndex(1);
  // }

  deleteGateway = (id) => {
    confirm('Are you sure, that you want to delete this gateway?').then(() => {
      this.props.deleteGateway(
        this.url,
        id,
        this.props.profile.role.type === 'root' ? this.props.match.params.id : null,
      );
    }, () => {
    });
  }

  showAddForm = () => {
    this.setState({
      showAddGateway: true
    });
  }

  showPreloader = () => {
    this.setState({
      isLoad: true
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddGateway: false
    });
  }

  hideEditForm = () => {
    this.setState({
      showEditGateway: false,
      editing: {}
    });
  }

  returnLink() {
    const {
      profile, site
    } = this.props;
    if (profile) {
      const companyName = (profile.company_admin && profile.company_admin.company_name) || (profile.manager_company && profile.manager_company.company_name) || (profile.viewer_company && profile.viewer_company.company_name);
      return profile.role && profile.role.type === 'root' ?
        [{ label: 'Companies', link: 'companies' }, { label: site.company && site.company.company_name, link: `company/${site.company && site.company.id}/details` }] :
        [{
          label: companyName,
          // label: 'Company',
          link: 'company/details'
        }];
    }
    return [];
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

  render() {
    const currentEntity = this.props.site.name || '';
    const { site_manager } = this.props.profile;
    const type = this.props.profile && this.props.profile.role && this.props.profile.role.type;

    const topPanelAction = {
      role: (type === 'company' || type === 'root' || (type === 'managers' && this.props.match.params.id === (site_manager && site_manager._id))),
      showAddForm: this.showAddForm
    };
    return (
      <Fragment>
        <div className="m-grid__item m-grid__item--fluid m-wrapper companies edit-company">
          <div className="m-subheader ">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="m-subheader__title ">
                  {currentEntity}
                </h3>
                <Breadcrumbs pages={this.returnLink()} current={currentEntity} />
              </div>
            </div>
          </div>

          <div className="m-content">
            <div className="row">
              <div className="col-md-12">
                <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb sensors-body">
                  <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                      <br />
                      <ul className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                        <li className="nav-item m-tabs__item nav-item__padding-none">
                          <Link to={`../site/${this.props.match && this.props.match.params && this.props.match.params.id}`}>Site details</Link>
                        </li>
                        <li className="nav-item m-tabs__item react-tabs__tab--selected">Gateways</li>
                        <li className="nav-item m-tabs__item nav-item__padding-none">
                          <Link to={`../devices/${this.props.site && this.props.site.id}`}>Devices</Link>
                        </li>
                        <li className="nav-item m-tabs__item nav-item__padding-none">
                          <Link to={`../sensors/${this.props.site && this.props.site.id}`}>Sensors</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ExtraAwesomeList
                    className="gateways-list"
                    item={GatewayItem}
                    head={GatewayHead}
                    actions={this.actions}
                    url={type === 'root' ? `${this.url}?site=${this.props.match && this.props.match.params && this.props.match.params.id}` : this.url}
                    defaultQuery={{ _sort: 'name:asc' }}
                    TopPanel={TopPanel}
                    topPanelAction={topPanelAction}
                    searchBy="name"
                    tab
                  />
                </div>
              </div>
            </div>
          </div>

          <AddGatewayForm
            show={this.state.showAddGateway}
            onSubmit={this.onAddGateway}
            hide={this.hideAddForm}
            notRoot={this.props.profile && this.props.profile.role && this.props.profile.role.type !== 'root'}
          />

          <EditGatewayForm
            show={this.state.showEditGateway}
            onSubmit={this.onEditGateway}
            hide={this.hideEditForm}
            data={this.state.editing}
            notRoot={this.props.profile && this.props.profile.role && this.props.profile.role.type !== 'root'}
          />
          {
            this.state.isLoad ?
              <Loadable
                active={this.state.isLoad}
                spinner
                text="Loading..."
              /> : null
          }
        </div>
      </Fragment>
    );
  }
}

GatewayList.propTypes = {
  gateways: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  site: PropTypes.instanceOf(Object),

  addGateway: PropTypes.func,
  editGateway: PropTypes.func,
  deleteGateway: PropTypes.func,
  getEntityById: PropTypes.func,
  getGatewaysList: PropTypes.func
};

GatewayList.defaultProps = {
  gateways: {},
  profile: {},
  match: {},
  site: {},
  addGateway: () => {},
  editGateway: () => {},
  deleteGateway: () => {},
  getEntityById: () => {},
  getGatewaysList: () => {}

};

function mapStateToProps(state) {
  return {
    gateways: state.gateways && state.gateways.list,
    site: state.sites
  };
}

export default connect(mapStateToProps, {
  push, getGatewaysList, addGateway, editGateway, deleteGateway, changeDefaultIndex, getEntityById
})(GatewayList);
