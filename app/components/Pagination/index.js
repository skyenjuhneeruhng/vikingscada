import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const PAGINATION_RANGE = 3;

/**
 * Pagination
 */
class Pagination extends React.Component {
  onPage = (num) => {
    this.props.onPage(num);
  }

  get current() {
    const { limit, skip } = this.props;
    return Math.ceil(skip / limit) + 1;
  }

  get last() {
    const { total, limit } = this.props;
    return Math.ceil(total / limit);
  }

  prevPage = () => {
    const { current } = this;
    if (current - 1 >= 1) {
      this.onPage(current - 1);
    }
  }

  firstPage = () => {
    const { current } = this;
    if (current !== 1) {
      this.onPage(1);
    }
  }

  lastPage = () => {
    const { current, last } = this;
    if (current !== last) {
      this.onPage(last);
    }
  }

  nextPage = () => {
    const { current, last } = this;
    if (current + 1 <= last) {
      this.onPage(current + 1);
    }
  }

  renderPages = () => {
    const { current, last } = this;
    const pages = [];
    const minusValue = current === last ? 2 : 1;
    const start = current - minusValue > 0 ? current - minusValue : 1;
    const end = start + PAGINATION_RANGE - 1 > last ? last : start + PAGINATION_RANGE - 1;
    for (let i = start; i <= end; i += 1) {
      pages.push(
        <li key={i} onClick={() => this.onPage(i)}>
          <a className={`m-datatable__pager-link m-datatable__pager-link-number ${current === i ? 'm-datatable__pager-link--active' : ''}`} >{i}</a>
        </li>
      );
    }
    return pages;
  }

  render() {
    const { current, last } = this;
    const classForFirst = current === 1 ? 'm-datatable__pager-link--disabled' : '';
    const classForLast = current === last ? 'm-datatable__pager-link--disabled' : '';

    return (
      <ul className="m-datatable__pager-nav">
        <li onClick={this.firstPage}>
          <a title="First" className={`m-datatable__pager-link m-datatable__pager-link--first ${classForFirst}`}>
            <i className="la la-angle-double-left" />
          </a>
        </li>
        <li onClick={this.prevPage}>
          <a title="Previous" className={`m-datatable__pager-link m-datatable__pager-link--prev ${classForFirst}`}>
            <i className="la la-angle-left" />
          </a>
        </li>
        {this.renderPages()}
        <li onClick={this.nextPage}>
          <a title="Next" className={`m-datatable__pager-link m-datatable__pager-link--next ${classForLast}`}>
            <i className="la la-angle-right" />
          </a>
        </li>
        <li onClick={this.lastPage}>
          <a title="Last" className={`m-datatable__pager-link m-datatable__pager-link--last ${classForLast}`}>
            <i className="la la-angle-double-right" />
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  onPage: PropTypes.func,
  limit: PropTypes.number,
  total: PropTypes.number,
  skip: PropTypes.number
};


Pagination.defaultProps = {
  onPage() {},
  limit: 0,
  total: 0,
  skip: 0
};
export default Pagination;
