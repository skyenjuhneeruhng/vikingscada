import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import DropdownButton from '../../../../components/UIKit/DropdownButton';
import CompanyItemSubtable from '../CompanyItemSubtable';

export class CompanyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

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

  openSubtable = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {
      id, company_name, sites, state, updatedAt, status, edited, deleted,
      first_name, last_name, email, address, company_certificate, changeStatus
    } = this.props;

    return (
      <Fragment>
        <tr className="m-datatable__row">
          <td className="m-datatable__cell" width="20px">
            <a className="m-datatable__toggle-subtable m-datatable__cell-arrow" href="/" onClick={this.openSubtable}>
              { this.state.open ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-right" />}
            </a>
          </td>
          <td className="m-datatable__cell" onClick={this.openSubtable}>
            <span className="m-datatable__cell-name">
              {company_name}
            </span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-sites">{sites.length}</span>
          </td>
          <td className="m-datatable__cell">
            <span className="m-datatable__cell-state">{state}</span>
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
            <span className="m-datatable__cell-actions">{edited}</span>
            <span>{deleted}</span>
            <a role="button" onClick={this.editItem} className="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill" title="Edit">
              <i className="la la-edit" />
            </a>
            <a role="button" onClick={this.deleteItem} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
              <i className="la la-trash" />
            </a>
          </td>
        </tr>
        <CompanyItemSubtable
          open={this.state.open}
          cerificate={company_certificate}
          adress={address}
          user={first_name && last_name ? `${first_name} ${last_name}` : '-'}
          email={email}
          sites={sites}
        />
      </Fragment>
    );
  }
}

CompanyItem.propTypes = {
  id: PropTypes.string.isRequired,
  company_name: PropTypes.string.isRequired,
  sites: PropTypes.string,
  state: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  company_certificate: PropTypes.string,
  changeStatus: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  edited: PropTypes.string,
  deleted: PropTypes.string
};

CompanyItem.defaultProps = {
  sites: '1',
  state: '-',
  first_name: '',
  last_name: '',
  email: '-',
  address: '-',
  company_certificate: '-',
  edited: '',
  deleted: ''
};

export default CompanyItem;
