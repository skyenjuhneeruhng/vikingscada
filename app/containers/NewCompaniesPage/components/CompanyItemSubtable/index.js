import React from 'react';
import PropTypes from 'prop-types';

export class CompanyItemSubtable extends React.Component {
  renderSites(data, i) {
    return (
      <li className="sites" key={i}><span>{data.name}</span></li>
    );
  }

  render() {
    const {
      open, adress, user, email, sites
    } = this.props;
    return open ? (
      <tr className="m-datatable__row m-datatable__row--sub">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-info">
            <ul>
              <li className="adress"><span>Address</span> <span>{adress}</span></li>
              <li><span>Admin</span> <span>{user}</span></li>
              <li><span>Admin's email</span> <span>{email}</span></li>
            </ul>
          </span>
        </td>
        <td colSpan="6" className="m-datatable__cell">
          <span className="m-datatable__cell-sites-list">
            <ul>
              {sites.map((data, i) => this.renderSites(data, i))}
            </ul>
          </span>
        </td>
      </tr>
    ) : null;
  }
}

CompanyItemSubtable.propTypes = {
  open: PropTypes.bool,
  adress: PropTypes.string,
  user: PropTypes.string,
  email: PropTypes.string,
  sites: PropTypes.instanceOf(Array)
};

CompanyItemSubtable.defaultProps = {
  open: false,
  adress: '',
  user: '',
  email: '',
  sites: ['site1', 'site2']
};

export default CompanyItemSubtable;
