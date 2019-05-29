import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

// import { getCompany } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import DeviceItem from './components/DeviceItem';
import DeviceHead from './components/DeviceHead';

import AddDeviceForm from './addDeviceForm';
import EditDeviceForm from './editDeviceForm';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { getDevicesList, addDevice, editDevice, deleteDevice } from './actions';
import { getGatewaysList } from '../GatewayList/actions';
import { getEntityById } from '../NewBasePage/actions';


const TopPanel = (props) => {
  const { role, showModal } = props;

  if (role) {
    return (
      <div className="col-md-4 order-1 order-md-2 m--align-right">
        <a
          role="button"
          onClick={() => showModal()}
          className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
        >
          <span>
            <i className="la la-plus" />
            <span>
              Add Device
            </span>
          </span>
        </a>
        <div className="m-separator m-separator--dashed d-md-none" />
      </div>
    );
  }
  return null;
};

class DevicesList extends Component {
  constructor(props) {
    super(props);

    this.url = props.profile && props.profile.role && props.profile.role.type === 'root' ?
      'device' :
      `account/device/${props.match && props.match.params && props.match.params.id}`;

    this.actions = {
      edit: this.editDevice,
      // openGateway: this.openDevice,
      deleteItem: this.deleteDevice
    };

    this.state = {
      showAddDevice: false,
      showEditDevice: false,
      editing: {},
      gateways: []
    };
  }

  componentDidMount() {
    const { profile, match } = this.props;
    if (_.isEmpty(this.props.gateways)) {
      this.props.getGatewaysList(
        profile && profile.role && profile.role.type === 'root' ? `gateway?site=${match && match.params && match.params.id}` : `account/gateway/${match && match.params && match.params.id}`,
        {}
      );
    }

    this.props.getDevicesList(
      profile && profile.role && profile.role.type === 'root' ? `device?site=${match && match.params && match.params.id}` : this.url,
      {}
    );

    if (_.isEmpty(this.props.site)) {
      let route = 'site';
      switch (profile && profile.role && profile.role.type) {
        case 'company': route = 'account/site'; break;
        case 'managers': route = 'account/site/me'; break;
        default: route = 'site';
      }
      this.props.getEntityById(
        (profile && profile.role && profile.role.type) === 'managers' ? '' : (match && match.params && match.params.id) || '',
        route
      );
    }
  }

  componentWillReceiveProps() {
    const gateways = this.props.gateways.map((gateway) => ({ name: gateway.name, value: gateway.id }));
    this.setState({
      gateways
    });
  }

  onAddDevice = (values) => {
    this.hideAddForm();
    this.props.addDevice(
      this.url,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    );
  }

  onEditDevice = (values) => {
    const { id } = this.state.editing;
    this.setState({
      showEditDevice: false,
      editing: {}
    }, () => this.props.editDevice(
      this.url,
      id,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    ));
  }

  editDevice = (id) => {
    const device = this.props.devices.filter((item) => item.id === id)[0];
    const gateways = this.props.gateways.map((gateway) => ({ name: gateway.name, value: gateway.id }));
    this.setState({
      showEditDevice: true,
      editing: {
        name: device.name,
        serial_number: device.serial_number,
        software_version: device.software_version,
        location: device.location,
        modbus_id: device.modbus_id,
        gateway: device.gateway && device.gateway.id,
        site: id,
        id
      },
      gateways
    });
  }

  // openDashboard = (id) => {
  //   this.props.push(`/dashboard/${this.props.match.params.id}-${id}`);
  //   this.props.changeDefaultIndex(1);
  // }

  deleteDevice = (id) => {
    confirm('Are you sure, that you want to delete this gateway?').then(() => {
      this.props.deleteDevice(
        this.url,
        id,
        this.props.profile.role.type === 'root' ? this.props.match.params.id : null,
      );
    }, () => {
    });
  }

  showAddForm = () => {
    const gateways = this.props.gateways.map((gateway) => ({ name: gateway.name, value: gateway.id }));
    this.setState({
      showAddDevice: true,
      gateways
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddDevice: false
    });
  }

  hideEditForm = () => {
    this.setState({
      showEditDevice: false,
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
          link: 'company/details'
        }];
    }
    return [];
  }

  render() {
    const currentEntity = (this.props.site && this.props.site.name) || '';
    const { type } = this.props.profile && this.props.profile.role && this.props.profile.role;
    let topPanelAction = {};
    if (this.props.profile) {
      topPanelAction = {
        role: (type === 'company' || type === 'root' || (type === 'managers' && this.props.match.params.id === (this.props.profile.site_manager && this.props.profile.site_manager._id))),
        showAddForm: this.showAddForm
      };
    }

    const gateways = [{ value: '', name: 'Choose gateway' }, ...this.state.gateways];

    return (
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
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../gateways/${this.props.site && this.props.site.id}`}>Gateways</Link>
                      </li>
                      <li className="nav-item m-tabs__item react-tabs__tab--selected">Devices</li>
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../sensors/${this.props.site && this.props.site.id}`}>Sensors</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <ExtraAwesomeList
                  className="devices-list"
                  item={DeviceItem}
                  head={DeviceHead}
                  actions={this.actions}
                  url={type === 'root' ? `${this.url}?site=${this.props.match && this.props.match.params && this.props.match.params.id}` : this.url}
                  defaultQuery={{ _sort: 'name:asc' }}
                  TopPanel={TopPanel}
                  topPanelAction={topPanelAction}
                  filter={gateways}
                  filterBy="gateway"
                  searchBy="name"
                  tab
                />
              </div>
            </div>
          </div>
        </div>

        <AddDeviceForm
          show={this.state.showAddDevice}
          onSubmit={this.onAddDevice}
          hide={this.hideAddForm}
          notRoot={this.props.profile && this.props.profile.role && this.props.profile.role.type !== 'root'}
          gateways={gateways}
        />

        <EditDeviceForm
          show={this.state.showEditDevice}
          onSubmit={this.onEditDevice}
          hide={this.hideEditForm}
          data={this.state.editing}
          gateways={gateways}
        />
      </div>
    );
  }
}

DevicesList.propTypes = {
  gateways: PropTypes.instanceOf(Object),
  devices: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  site: PropTypes.instanceOf(Object),
  // push: PropTypes.func,
  addDevice: PropTypes.func,
  editDevice: PropTypes.func,
  deleteDevice: PropTypes.func,
  getEntityById: PropTypes.func,
  getGatewaysList: PropTypes.func,
  getDevicesList: PropTypes.func
};

DevicesList.defaultProps = {
  gateways: {},
  devices: {},
  profile: {},
  match: {},
  site: {},
  addDevice() {},
  editDevice() {},
  deleteDevice() {},
  getEntityById() {},
  getGatewaysList() {},
  getDevicesList() {}
};

TopPanel.propTypes = {
  role: PropTypes.bool,
  showModal: PropTypes.func
};

TopPanel.defaultProps = {
  role: false,
  showModal() {}
};

function mapStateToProps(state) {
  return {
    gateways: state.gateways && state.gateways.list,
    devices: state.devices && state.devices.list,
    site: state.sites
  };
}

export default connect(mapStateToProps, {
  push, getGatewaysList, getDevicesList, addDevice, editDevice, deleteDevice, changeDefaultIndex, getEntityById
})(DevicesList);
