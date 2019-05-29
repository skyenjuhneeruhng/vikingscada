import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class SiteItem extends React.Component {
  editItem = (e) => {
    e.preventDefault();

    const { id, edit } = this.props;
    edit(id);
  }

  openDashboard = (e) => {
    e.preventDefault();

    const { id, openDashboard } = this.props;
    openDashboard(id);
  }

  deleteItem = (e) => {
    e.preventDefault();

    const { id, deleteItem } = this.props;
    deleteItem(id);
  }

  render() {
    const {
      name, site, profile: { role, site_manager }
    } = this.props;
    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name" onClick={this.openDashboard}>
            {name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-alerts" />
        </td>
        {(role.type === 'company' || role.type === 'root' || (role.type === 'managers' && site_manager.id === site.id)) && (
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
    );
  }
}

SiteItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  site: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.func.isRequired,
  openDashboard: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

SiteItem.defaultProps = {
  name: ''
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(SiteItem);
