import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEntityById } from '../../../NewBasePage/actions';

export class GatewayItem extends React.Component {
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

  // openDashboard = (e) => {
  //   e.preventDefault();

  //   const { id, openDashboard } = this.props;
  //   openDashboard(id);
  // }

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

  render() {
    const {
      name, site, gateway, serial_number, software_version, location, profile: { role, site_manager }
    } = this.props;
    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name" >
            {name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-gateway">
            {(gateway && gateway.name) || ''}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-number">
            {serial_number}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-number">
            {software_version}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-number">
            {location}
          </span>
        </td>
        {(role.type === 'company' || role.type === 'root' || (role.type === 'managers' && site_manager._id === site.id)) && (
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-actions">
              <a href="/" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
                <i className="la la-edit" />
              </a>
              <a href="/" onClick={this.deleteItem} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
                <i className="la la-trash" />
              </a>
            </span>
          </td>
        )}
      </tr>
    );
  }
}

GatewayItem.propTypes = {
  name: PropTypes.string.isRequired,
  serial_number: PropTypes.string.isRequired,
  software_version: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  site: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  gateway: PropTypes.instanceOf(Object).isRequired,
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

export default connect(mapStateToProps, { getEntityById })(GatewayItem);
