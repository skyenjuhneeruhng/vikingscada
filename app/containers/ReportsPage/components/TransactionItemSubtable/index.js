import React from 'react';
import PropTypes from 'prop-types';


export class CompanyItemSubtable extends React.Component {
  createOptions(data, i, title) {
    return (
      <ul className="sensors-add-list">
        <li>
          <span>{i === 0 ? title : ''}</span>
          <span style={{ fontWeight: 500 }}>{`${data.first_name} ${data.last_name}`}</span>
        </li>
        <li>
          <span />
          <span>{data.email}</span>
        </li>
        <li>
          <span />
          <span>{data.phone}</span>
        </li>
      </ul>
    );
  }
  render() {
    const {
      open, users
    } = this.props;
    return open ? (
      <tr className="m-datatable__row m-datatable__row--sub">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell reports-type">
            <div>{users && users.sms && users.sms.map((data, i) => this.createOptions(data, i, 'SMS notification'))}</div>
            <div>{users && users.email && users.email.map((data, i) => this.createOptions(data, i, 'Email notification'))}</div>
            <div>{users && users.voice && users.voice.map((data, i) => this.createOptions(data.user, i, 'Voice notification'))}</div>
          </span>
        </td>
      </tr>
    ) : null;
  }
}

CompanyItemSubtable.propTypes = {
  open: PropTypes.bool,
  users: PropTypes.instanceOf(Object)
};

CompanyItemSubtable.defaultProps = {
  open: false,
  users: {}
};

export default CompanyItemSubtable;
