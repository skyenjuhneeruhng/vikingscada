import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export class SiteItem extends React.Component {
  getValidDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  typeClass(type) {
    let typeClass = '';
    switch (type) {
      case 'subscribed': typeClass = 'success'; break;
      case 'unsubscribed': typeClass = 'warning'; break;
      default: typeClass = '';
    }
    return typeClass;
  }

  statusClass(status) {
    let statusClass = 'info';
    switch (status) {
      case 'subscribe': statusClass = 'info'; break;
      case 'custom': statusClass = 'danger'; break;
      default: statusClass = 'warning';
    }
    return statusClass;
  }

  render() {
    const {
      type, updatedAt, status, id, payment_desc, payment_name, purchased
    } = this.props;

    const name = (type === 'custom') ? this.props.custom_plan && this.props.custom_plan.name : this.props.subscribe && this.props.subscribe.nickname;
    const desc = (type === 'custom') ? this.props.custom_plan && this.props.custom_plan.desc : this.props.subscribe && this.props.subscribe.metadata && this.props.subscribe.metadata[1];
    // let mb = (type === 'custom') ? this.props.custom_plan && this.props.custom_plan.mb : this.props.subscribe && this.props.subscribe.nickname;
    const price = (type === 'custom') ? this.props.custom_plan && (this.props.custom_plan.price / 100) : this.props.subscribe && (this.props.subscribe.amount / 100);

    return (
      <tr className="m-datatable__row">
        <td className="m-datatable__cell">
          <span role="button" className="m-datatable__cell-name">
            {payment_name || name}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-description">
            {payment_desc || desc}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-data">
            {this.getValidDate(updatedAt)}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-status ">
            <span className={`m--font-bold m--font-${this.typeClass(status)} m-badge--wide`}>{status ? status : 'N / A'}</span>
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-status ">
            <span className={`m-badge m-badge--${this.statusClass(type)} m-badge--wide`}>{type === 'custom' ? 'custom plan' : 'subscription'}</span>
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-payment m--font-success">
            ${(purchased / 100) || price}
          </span>
        </td>
        <td className="m-datatable__cell">
          <span className="m-datatable__cell-payment">
            <Link to={`invoice/${id}`} className="m-nav__link">
              <span className="m-nav__link-text">Get invoice</span>
            </Link>
          </span>
        </td>
      </tr>
    );
  }
}

SiteItem.propTypes = {
  type: PropTypes.string,
  payment_desc: PropTypes.string,
  payment_name: PropTypes.string,
  purchased: PropTypes.number,
  updatedAt: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.string,
  custom_plan: PropTypes.instanceOf(Object),
  subscribe: PropTypes.instanceOf(Object)
};

SiteItem.defaultProps = {
  type: '',
  payment_desc: '',
  payment_name: '',
  purchased: 0,
  updatedAt: '',
  status: '',
  id: '',
  custom_plan: {},
  subscribe: {}
};

export default SiteItem;
