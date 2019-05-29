import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';

// import { getCompany } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import SensorItem from './components/SensorItem';
import SensorHead from './components/SensorHead';

import AddSensorForm from './addSensorForm';
import EditSensorForm from './editSensorForm';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

import ExtraAwesomeList from './../ExtraAwesomeList';

import { getSensorsList, addSensor, editSensor, deleteSensor } from './actions';
import { getDevicesList } from '../DevicesList/actions';
import { getEntityById } from '../NewBasePage/actions';


const TopPanel = (props) => {
  const { role, showModal } = props;
  return role && (
    <div className="col-md-4 order-1 order-md-2 m--align-right">
      <a
        role="button"
        onClick={() => showModal()}
        className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
      >
        <span>
          <i className="la la-plus" />
          <span>
            Add Sensors
          </span>
        </span>
      </a>
      <div className="m-separator m-separator--dashed d-md-none" />
    </div>
  );
};

class SensorsList extends Component {
  constructor(props) {
    super(props);

    const { profile, match } = props;

    this.url = profile && profile.role && profile.role.type === 'root' ?
      'sensor' :
      `account/sensor/${match && match.params && match.params.id}`;

    this.actions = {
      edit: this.editSensor,
      // openGateway: this.openSensor,
      deleteItem: this.deleteSensor
    };

    this.state = {
      showAddSensor: false,
      showEditSensor: false,
      editing: {},
      devices: []
    };
  }

  componentDidMount() {
    const type = this.props.profile && this.props.profile.role && this.props.profile.role.type;
    const id = this.props.match && this.props.match.params && this.props.match.params.id;

    if (_.isEmpty(this.props.devices)) {
      this.props.getDevicesList(
        type === 'root' ? `device?site=${id}` : `account/device/${id}`,
        {}
      );
    }

    this.props.getSensorsList(
      type === 'root' ? `sensor?site=${id}` : this.url,
      {}
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

  componentWillReceiveProps() {
    const devices = this.props.devices.map((device) => ({ name: device.name, value: device.id }));
    this.setState({
      devices
    });
  }

  onAddSensor = (values) => {
    this.hideAddForm();
    this.props.addSensor(
      this.url,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    );
  }

  onEditSensor = (values) => {
    const { id } = this.state.editing;
    this.setState({
      showEditSensor: false,
      editing: {}
    }, () => this.props.editSensor(
      this.url,
      id,
      this.props.profile.role.type === 'root' ?
        { ...values, site: this.props.match.params.id } :
        values,
      this.props.profile.role.type === 'root'
    ));
  }

  editSensor = (id) => {
    const sensor = this.props.sensors.filter((item) => item.id === id)[0];
    const devices = this.props.devices.map((device) => ({ name: device.name, value: device.id }));
    this.setState({
      showEditSensor: true,
      editing: {
        name: sensor.name,
        tag_name: sensor.tag_name,
        modbus_register_type: sensor.modbus_register_type,
        modbus_register_address: sensor.modbus_register_address,
        modbus_data_type: sensor.modbus_data_type,
        engineer_value_from: sensor.engineer_value_from,
        engineer_value_to: sensor.engineer_value_to,
        modbus_data_size_bytes: sensor.modbus_data_size_bytes,
        sampling_internal_ms: sensor.sampling_internal_ms,
        value_multiplier: sensor.value_multiplier,
        units: sensor.units,
        device: sensor.device && sensor.device.id,
        bitmask: sensor.bitmask,
        site: id,
        id
      },
      devices
    });
  }

  // openDashboard = (id) => {
  //   this.props.push(`/dashboard/${this.props.match.params.id}-${id}`);
  //   this.props.changeDefaultIndex(1);
  // }

  deleteSensor = (id) => {
    confirm('Are you sure, that you want to delete this device?').then(() => {
      this.props.deleteSensor(
        this.url,
        id,
        this.props.profile.role.type === 'root' ? this.props.match.params.id : null,
      );
    }, () => {
    });
  }

  showAddForm = () => {
    const devices = this.props.devices.map((device) => ({ name: device.name, value: device.id }));
    this.setState({
      showAddSensor: true,
      devices
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddSensor: false
    });
  }

  hideEditForm = () => {
    this.setState({
      showEditSensor: false,
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

  render() {
    const currentEntity = (this.props.site && this.props.site.name) || '';
    const managerId = this.props.profile && this.props.profile.site_manager && this.props.profile.site_manager.id;
    const type = this.props.profile && this.props.profile.role && this.props.profile.role.type;

    const topPanelAction = {
      role: (type === 'company' || type === 'root' || (type === 'managers' && this.props.match.params.id === managerId)),
      showAddForm: this.showAddForm
    };

    const devices = [{ value: '', name: 'Choose device' }, ...this.state.devices];

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
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../devices/${this.props.site && this.props.site.id}`}>Devices</Link>
                      </li>
                      <li className="nav-item m-tabs__item react-tabs__tab--selected">Sensors</li>
                    </ul>
                  </div>
                </div>
                <ExtraAwesomeList
                  className="sensors-list"
                  item={SensorItem}
                  head={SensorHead}
                  actions={this.actions}
                  url={type === 'root' ? `${this.url}?site=${this.props.match && this.props.match.params && this.props.match.params.id}` : this.url}
                  defaultQuery={{ _sort: 'name:asc' }}
                  TopPanel={TopPanel}
                  topPanelAction={topPanelAction}
                  filter={devices}
                  filterBy="device"
                  searchBy="name"
                  tab
                />
              </div>
            </div>
          </div>
        </div>

        <AddSensorForm
          show={this.state.showAddSensor}
          onSubmit={this.onAddSensor}
          hide={this.hideAddForm}
          notRoot={this.props.profile && this.props.profile.role && this.props.profile.role.type !== 'root'}
          devices={devices}
        />

        <EditSensorForm
          show={this.state.showEditSensor}
          onSubmit={this.onEditSensor}
          hide={this.hideEditForm}
          data={this.state.editing}
          devices={devices}
        />
      </div>
    );
  }
}

SensorsList.propTypes = {
  devices: PropTypes.instanceOf(Object),
  sensors: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  site: PropTypes.instanceOf(Object),
  addSensor: PropTypes.func,
  editSensor: PropTypes.func,
  deleteSensor: PropTypes.func,
  getEntityById: PropTypes.func,
  getSensorsList: PropTypes.func,
  getDevicesList: PropTypes.func
};

SensorsList.defaultProps = {
  devices: {},
  sensors: {},
  profile: {},
  match: {},
  site: {},
  addSensor: () => {},
  editSensor: () => {},
  deleteSensor: () => {},
  getEntityById: () => {},
  getSensorsList: () => {},
  getDevicesList: () => {}
};

function mapStateToProps(state) {
  return {
    devices: state.devices && state.devices.list,
    sensors: state.sensors && state.sensors.list,
    site: state.sites
  };
}

export default connect(mapStateToProps, {
  push, getDevicesList, getSensorsList, addSensor, editSensor, deleteSensor, changeDefaultIndex, getEntityById
})(SensorsList);
