import React from 'react';
import PropTypes from 'prop-types';

import UserItem from '../UserItem';

export class UsersList extends React.Component {
  sortByTitle = (name) => (e) => {
    e.preventDefault();
    this.props.sortByTitle(name);
  }

  sortName(sort) {
    switch (sort) {
      case 'updatedAt:desc': return null;
      case 'company_name:asc': return <i className="la la-arrow-up" />;
      case 'company_name:desc': return <i className="la la-arrow-down" />;
      default:
        return null;
    }
  }

  sortState(sort) {
    switch (sort) {
      case 'updatedAt:desc': return null;
      case 'state:asc': return <i className="la la-arrow-up" />;
      case 'state:desc': return <i className="la la-arrow-down" />;
      default:
        return null;
    }
  }
  sortDate(sort) {
    switch (sort) {
      case 'updatedAt:desc': return <i className="la la-arrow-up" />;
      case 'updatedAt:asc': return <i className="la la-arrow-down" />;
      default:
        return null;
    }
  }

  render() {
    const {
      companies, editCompany, deleteCompany, changeStatus, sort
    } = this.props;
    return (
      <div className="m_datatable m-datatable m-datatable--default m-datatable--loaded" id="local_data">
        <table className="m-datatable__table">
          <thead className="m-datatable__head">
            <tr className="m-datatable__row">
              <th className="m-datatable__cell m-datatable__cell--users" onClick={this.sortByTitle('company_name')}>
                <span className="m-datatable__cell-name">User
                  {this.sortName(sort)}
                </span>
              </th>
              <th className="m-datatable__cell">
                <span className="m-datatable__cell-email">Email</span>
              </th>
              <th className="m-datatable__cell">
                <span className="m-datatable__cell-company">Company</span>
              </th>
              <th className="m-datatable__cell" onClick={this.sortByTitle('updatedAt')}>
                <span className="m-datatable__cell-date">Date
                  {this.sortDate(sort)}
                </span>
              </th>
              <th className="m-datatable__cell">
                <span className="m-datatable__cell-status">Status</span>
              </th>
              <th className="m-datatable__cell">
                <span className="m-datatable__cell-actions">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="m-datatable__body">
            {companies.map((company) => (
              <UserItem
                key={company.id}
                {...company}
                edit={editCompany}
                deleteItem={deleteCompany}
                changeStatus={changeStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

UsersList.propTypes = {
  companies: PropTypes.instanceOf(Object).isRequired,
  editCompany: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  sortByTitle: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired
};

export default UsersList;
