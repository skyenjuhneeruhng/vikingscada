import React from 'react';
import PropTypes from 'prop-types';

export class PlanItem extends React.Component {
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
      name, desc, mb, price
    } = this.props;
    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name" >
            {name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-description">
            {desc}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-numbers">
            {mb}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-numbers m--font-success">
            {`$ ${price / 100}`}
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

PlanItem.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  mb: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  // openDashboard: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

PlanItem.defaultProps = {
  name: '',
  desc: '',
  mb: 0,
  price: 0
};

export default PlanItem;
