import React from 'react';
import PropTypes from 'prop-types';


export class CompanyItemSubtable extends React.Component {
  render() {
    const {
      open, modbus_register_type, modbus_data_type, modbus_data_size_bytes, sampling_internal_ms, value_multiplier, modbus_register_address
    } = this.props;
    return open ? (
      <tr className="m-datatable__row m-datatable__row--sub">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell">
            <ul className="sensors-add-list">
              <li><span>Modbus Register Type</span> <span>{modbus_register_type}</span></li>
              <li><span>modbus Register Address</span> <span>{modbus_register_address}</span></li>
              <li><span>Modbus Data Type</span> <span>{modbus_data_type}</span></li>
              <li><span>Modbus Data Size (Bytes) </span> <span>{modbus_data_size_bytes}</span></li>
              <li><span>Sampling Interval (ms)</span> <span>{sampling_internal_ms}</span></li>
              <li><span>Value Multiplier</span> <span>{value_multiplier}</span></li>
            </ul>
          </span>
        </td>
      </tr>
    ) : null;
  }
}

CompanyItemSubtable.propTypes = {
  open: PropTypes.bool,
  modbus_register_type: PropTypes.string.isRequired,
  modbus_register_address: PropTypes.string.isRequired,
  modbus_data_type: PropTypes.string.isRequired,
  modbus_data_size_bytes: PropTypes.string.isRequired,
  sampling_internal_ms: PropTypes.string.isRequired,
  value_multiplier: PropTypes.string.isRequired
};

CompanyItemSubtable.defaultProps = {
  open: false
};

export default CompanyItemSubtable;
