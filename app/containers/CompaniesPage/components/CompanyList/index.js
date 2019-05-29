import React from 'react';
import PropTypes from 'prop-types';
import CompanyItem from '../CompanyItem';

class CompanyList extends React.Component {
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
      <table className="m-datatable__table">
        <thead className="m-datatable__head">
          <tr className="m-datatable__row">
            <th className="m-datatable__cell m-datatable__cell--users" width="20px">
              <span className="m-datatable__cell-arrow" />
            </th>
            <th className="m-datatable__cell m-datatable__cell--users sort" onClick={this.sortByTitle('company_name')}>
              <span className="m-datatable__cell-name">Company
                {this.sortName(sort)}
              </span>
            </th>
            <th className="m-datatable__cell">
              <span className="m-datatable__cell-sites">Site</span>
            </th>
            <th className="m-datatable__cell sort" onClick={this.sortByTitle('state')}>
              <span className="m-datatable__cell-state">State
                {this.sortState(sort)}
              </span>
            </th>
            <th className="m-datatable__cell sort" onClick={this.sortByTitle('updatedAt')}>
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
          {companies && companies.map((company) => (
            <CompanyItem
              key={company.id}
              {...company}
              edit={editCompany}
              deleteItem={deleteCompany}
              changeStatus={changeStatus}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

CompanyList.propTypes = {
  companies: PropTypes.instanceOf(Object),
  editCompany: PropTypes.func,
  deleteCompany: PropTypes.func,
  sortByTitle: PropTypes.func,
  changeStatus: PropTypes.func,
  sort: PropTypes.string
};

CompanyList.DefaultTypes = {
  companies: [],
  editCompany() {},
  deleteCompany() {},
  sortByTitle() {},
  changeStatus() {},
  sort: ''
};

export default CompanyList;
