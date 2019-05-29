import React from 'react';
import PropTypes from 'prop-types';

import AvatarItem from '../AvatarItem';
import DropdownButton from '../../../../components/UIKit/DropdownButton';

export class UserItem extends React.Component {
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
      id, first_name, last_name, img, updatedAt, email, company_name, status, changeStatus
    } = this.props;

    const userName = `${first_name} ${last_name}`;
    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-name">
            <AvatarItem name={userName} img={img || null} />
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-email">{email}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-company">{company_name}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-date">{this.getValidDate(updatedAt)}</span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-status">
            <DropdownButton
              selected={status}
              options={[{ label: 'Approve', val: 'approved' }, { label: 'Reject', val: 'rejected' }]}
              onChoose={changeStatus.bind(null, id)}
              id={id}
            />
          </span>
        </td>
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
      </tr>
    );
  }
}

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  company_name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  changeStatus: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  img: PropTypes.string
};

UserItem.defaultProps = {
  first_name: '',
  last_name: '',
  email: '-',
  img: ''
};

export default UserItem;
