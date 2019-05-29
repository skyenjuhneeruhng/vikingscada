import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEntityById } from '../../../NewBasePage/actions';


import SensorItemSubtable from '../SensorItemSubtable';

export class SensorItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if (_.isEmpty(this.props.site) && this.props.match && this.props.match.params && this.props.match.params.id) {
      let route = 'site';
      switch (this.props.profile.role.type) {
        case 'company': route = 'account/site'; break;
        case 'managers': route = 'account/site/me'; break;
        default: route = 'site';
      }
      this.props.getEntityById(
        this.props.profile.role.type === 'managers' ? '' : this.props.match.params.id || '',
        route
      );
    }
  }

  editItem = (e) => {
    e.preventDefault();

    const { id, edit } = this.props;
    edit(id);
  }

  deleteItem = (e) => {
    e.preventDefault();

    const { id, deleteItem } = this.props;
    deleteItem(id);
  }

  statusClass(status) {
    let statusClass = 'warning';
    switch (status) {
      case 'pending': statusClass = 'warning'; break;
      case 'connected': statusClass = 'info'; break;
      case 'live': statusClass = 'success'; break;
      case 'ofline': statusClass = 'danger'; break;
      default: statusClass = 'warning';
    }
    return statusClass;
  }

  openSubtable = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {
      name, site, device, tag_name, units, modbus_register_type, modbus_register_address, modbus_data_type, modbus_data_size_bytes,
      sampling_internal_ms, value_multiplier, profile: { role, site_manager }
    } = this.props;
    return (
      <Fragment>
        <tr className="m-datatable__row">
          <td className="m-datatable__cell" width="20px">
            <a className="m-datatable__toggle-subtable m-datatable__cell-arrow" href="/" onClick={this.openSubtable}>
              { this.state.open ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-right" />}
            </a>
          </td>
          <td className="m-datatable__cell" onClick={this.openSubtable}>
            <span role="button" className="m-datatable__cell-name" >
              {name}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-device">
              {(device && device.name) || ''}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-number">
              {tag_name}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-number">
              {units}
            </span>
          </td>
          {(role.type === 'company' || role.type === 'root' || (role.type === 'managers' && site_manager._id === site.id)) && (
            <td className="m-datatable__cell">
              <a href="/" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
                <i className="la la-edit" />
              </a>
              <a href="/" onClick={this.deleteItem} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
                <i className="la la-trash" />
              </a>
            </td>
          )}
        </tr>
        <SensorItemSubtable
          open={this.state.open}
          modbus_register_type={modbus_register_type}
          modbus_register_address={modbus_register_address}
          modbus_data_type={modbus_data_type}
          modbus_data_size_bytes={modbus_data_size_bytes}
          sampling_internal_ms={sampling_internal_ms}
          value_multiplier={value_multiplier}
        />
      </Fragment>
    );
  }
}

SensorItem.propTypes = {
  name: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  tag_name: PropTypes.string.isRequired,
  modbus_register_type: PropTypes.string.isRequired,
  modbus_register_address: PropTypes.string.isRequired,
  modbus_data_type: PropTypes.string.isRequired,
  modbus_data_size_bytes: PropTypes.string.isRequired,
  sampling_internal_ms: PropTypes.string.isRequired,
  value_multiplier: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  site: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.func.isRequired,
  // openDashboard: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  getEntityById: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    site: state.sites
  };
}

export default connect(mapStateToProps, { getEntityById })(SensorItem);
