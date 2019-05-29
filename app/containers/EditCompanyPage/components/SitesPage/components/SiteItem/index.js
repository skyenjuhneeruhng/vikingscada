import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

export class SiteItem extends React.Component {
  openDashboards = (e) => {
    e.preventDefault();

    const { id, openDashboards } = this.props;
    openDashboards(id);
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

  render() {
    const {
      name, location, profile, id
    } = this.props;

    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name" onClick={this.openDashboards}>
            {name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-location">{location}</span>
        </td>
        <td className="m-datatable__cell">
          <a href="/" onClick={this.openDashboards} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Dashboards">
            <i className="la la-bar-chart" />
          </a>
          {
            ((profile.role.type === 'managers' && (id === (profile.site_manager && profile.site_manager._id))) ||
            (profile.role.type === 'company' || profile.role.type === 'root')) ?
              <a href="/" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
                <i className="la la-edit" />
              </a> :
              <a className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" style={{ visibility: 'hidden' }}>.</a>
          }
          { profile.role.type === 'company' || profile.role.type === 'root' ?
            <a href="/" onClick={this.deleteItem} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
              <i className="la la-trash" />
            </a> :
            <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" style={{ visibility: 'hidden' }}>
              <i className="la la-trash" />
            </a>
          }
        </td>
      </tr>
    );
  }
}

SiteItem.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  id: PropTypes.string.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.func.isRequired,
  openDashboards: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

SiteItem.defaultProps = {
  name: '',
  location: ''
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(SiteItem);
