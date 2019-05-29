import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DropdownButton from '../../../../../../components/UIKit/DropdownButton';

export class SiteItem extends React.Component {
  returnAction = (enabled) => {
    switch (enabled) {
      case true: return 'm-badge--success';
      case false: return 'm-badge--danger';
      default:
        return 'm-badge--success';
    }
  }

  returnRole = (user) => {
    if (user && user.company_admin) {
      return 'admin';
    } else if (user && user.manager_company) {
      return 'manager';
    }
    return 'viewer';
  }

  changeStatus = () => {
    const {
      enabled, id
    } = this.props;
    this.props.changeStatus(id, !enabled);
  }

  priorityUp = (e) => {
    e.preventDefault();
    const { id } = this.props;
    this.props.changePriority(id, 'up');
  }

  priorityDown = (e) => {
    e.preventDefault();
    const { id } = this.props;
    this.props.changePriority(id, 'down');
  }

  render() {
    const {
      user, priority, enabled, id, listIndex, listTotal
    } = this.props;

    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-location">
            <span className="priority-count">{priority}</span>
            { listIndex !== listTotal ?
              <a role="button" onClick={this.priorityDown} className="btn btn-secondary m-btn m-btn--icon m-btn--icon-only">
                <i className="la la-angle-down" />
              </a>
              : null
            }
            { listIndex ?
              <a role="button" onClick={this.priorityUp} className="btn btn-secondary m-btn m-btn--icon m-btn--icon-only">
                <i className="la la-angle-up" />
              </a>
              : null
            }
          </span>
        </td>
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name">
            {`${user && user.first_name} ${user && user.last_name}`}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-location">{this.returnRole(user)}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-location">{user && user.email}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-name">{user && user.phone}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-location m-datatable__cell-status">
            <DropdownButton
              selected={enabled ? 'Enabled' : 'Disabled'}
              options={[{ label: !enabled ? 'Enable' : 'Disable', val: !enabled }]}
              onChoose={this.changeStatus}
              id={id}
            />
          </span>
        </td>
      </tr>
    );
  }
}

SiteItem.propTypes = {
  user: PropTypes.instanceOf(Object),
  priority: PropTypes.number,
  enabled: PropTypes.bool,
  listIndex: PropTypes.number,
  listTotal: PropTypes.number,
  id: PropTypes.string.isRequired,
  changePriority: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired
};

SiteItem.defaultProps = {
  user: {},
  priority: 0,
  enabled: false,
  listIndex: 0,
  listTotal: 0
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(SiteItem);
