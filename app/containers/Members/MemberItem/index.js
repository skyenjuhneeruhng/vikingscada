import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DropdownButton from '../../../components/UIKit/DropdownButton';
import AvatarItem from '../../ProfilePage/components/AvatarItem';

class MemberItem extends React.Component {
  getValidDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
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
      id, first_name, last_name, email, site_manager, site_viewer, profile, status, changeStatus, role = {}, hide
    } = this.props;

    const userRole = profile.role.type;
    const canChangeStatus = (
      userRole === 'root' || userRole === 'company' ||
      (userRole === 'managers' && role.type === 'viewers' && site_viewer && site_viewer._id === profile.site_manager._id)
    );

    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-name">
            <AvatarItem name={`${first_name} ${last_name}`} />
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-email">{email}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-sites">
            {role.type === 'managers' ? site_manager && site_manager.name : site_viewer && site_viewer.name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-date">
            {
              role.type === 'managers' ?
                site_manager && this.getValidDate(site_manager.updatedAt) :
                site_viewer && this.getValidDate(site_viewer.updatedAt)
            }
          </span>
        </td>
        { !hide &&
          <Fragment>
            <td className="m-datatable__cell">
              <span className="m-datatable__cell-status">
                { canChangeStatus &&
                  <DropdownButton
                    selected={status}
                    options={[{ label: 'Approve', val: 'approved' }, { label: 'Reject', val: 'rejected' }]}
                    id={id}
                    onChoose={changeStatus.bind(null, id)}
                  />
                }
              </span>
            </td>
            <td className="m-datatable__cell">
              <span className="m-datatable__cell-actions">
                { ((userRole === 'managers' &&
                  (role.type === 'viewers' && site_viewer && site_viewer._id === profile.site_manager._id)) ||
                  (userRole === 'company' || userRole === 'root')) ?
                    <Fragment>
                      <a href="/" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
                        <i className="la la-edit" />
                      </a>
                      <a
                        href="/"
                        onClick={this.deleteItem}
                        className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill"
                        title="Delete"
                      >
                        <i className="la la-trash" />
                      </a>
                    </Fragment> :
                    <Fragment>
                      <a className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" style={{ visibility: 'hidden' }}>
                        <i className="la la-edit" />
                      </a>
                      <a className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" style={{ visibility: 'hidden' }}>
                        <i className="la la-trash" />
                      </a>
                    </Fragment>
                }
              </span>
            </td>
          </Fragment>
        }
      </tr>
    );
  }
}

MemberItem.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  site_manager: PropTypes.instanceOf(Object),
  site_viewer: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object).isRequired,
  role: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired
};

MemberItem.defaultProps = {
  first_name: '',
  last_name: '',
  status: 'pending',
  site_manager: null,
  site_viewer: null,
  email: ''
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(MemberItem);
