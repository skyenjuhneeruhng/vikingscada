import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SensorItemSubtable from '../TransactionItemSubtable';

export class SiteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  getValidDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  typeClass(type) {
    let typeClass = '';
    switch (type) {
      case 'warning': typeClass = 'm--font-warning'; break;
      case 'danger': typeClass = 'm--font-danger'; break;
      default: typeClass = '';
    }
    return typeClass;
  }

  bitmaskClass(value) {
    let typeClass = '';
    switch (value) {
      case 'On': typeClass = 'm--font-success'; break;
      case 'Off': typeClass = 'm--font-danger'; break;
      default: typeClass = '';
    }
    return typeClass;
  }

  statusClass(type) {
    let typeClass = 'warning';
    switch (type) {
      case 'warning': typeClass = 'warning'; break;
      case 'danger': typeClass = 'danger'; break;
      case 'bitmask': typeClass = 'info'; break;
      default: typeClass = 'warning';
    }
    return typeClass;
  }

  openSubtable = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  returnNotifications = () => {
    const { users } = this.props;
    const notifications = Object.keys(users).filter((key) => users[key].length > 0).join(', ');
    return notifications;
  }

  render() {
    const {
      type, updatedAt, alert_value, sensor_value, widget_title, users, user_readed
    } = this.props;

    let bitmaskAlertValue = '';
    let bitmaskSensorValue = '';

    if (type === 'bitmask') {
      bitmaskAlertValue = alert_value ? 'On' : 'Off';
      bitmaskSensorValue = sensor_value ? 'On' : 'Off';
    }

    this.returnNotifications();

    return (
      <Fragment>
        <tr className="m-datatable__row clicked" role="button" onClick={this.openSubtable}>
          <td className="m-datatable__cell" width="20px">
            <a className="m-datatable__toggle-subtable m-datatable__cell-arrow" >
              { this.state.open ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-right" />}
            </a>
          </td>
          <td className="m-datatable__cell">
            <span role="button" className="m-datatable__cell-name">
              {widget_title}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-status" >
              {this.returnNotifications()}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-status ">
              <span className={`m-badge m-badge--${this.statusClass(type)} m-badge--wide`}>{type}</span>
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-data">
              {this.getValidDate(updatedAt)}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className={`m-datatable__cell-status ${this.bitmaskClass(bitmaskAlertValue)}`}>
              {type === 'bitmask' ? bitmaskAlertValue : alert_value}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className={`m-datatable__cell-payment ${this.typeClass(type)} ${this.bitmaskClass(bitmaskSensorValue)}`}>
              {type === 'bitmask' ? bitmaskSensorValue : sensor_value}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span role="button" className="m-datatable__cell-acknowledge">
              {user_readed ? user_readed.email : 'No Acknowledge' }
            </span>
          </td>
        </tr>
        <SensorItemSubtable
          open={this.state.open}
          users={users}
        />
      </Fragment>
    );
  }
}

SiteItem.propTypes = {
  type: PropTypes.string,
  updatedAt: PropTypes.string,
  widget_title: PropTypes.string,
  users: PropTypes.instanceOf(Object),
  alert_value: PropTypes.number.isRequired,
  sensor_value: PropTypes.number.isRequired,
  user_readed: PropTypes.instanceOf(Object)
};

SiteItem.defaultProps = {
  type: '',
  updatedAt: '',
  widget_title: '',
  users: {},
  user_readed: null
};

export default SiteItem;
