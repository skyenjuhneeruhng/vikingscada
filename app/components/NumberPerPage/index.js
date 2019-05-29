import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Select from '../UIKit/Select';

/**
 * Number per page (for pagination)
 */
class NumberPerPage extends React.Component {
  onChangeLimit = (value) => {
    this.props.onChange(value);
  }

  render() {
    const { start, limit, total } = this.props;
    let finish = start + limit;
    finish = finish > total ? total : finish;
    return (
      <div className="m-datatable__pager-info">
        <div className="dropdown bootstrap-select">
          <Select
            type="text"
            name="category"
            className="per-page"
            value={limit}
            options={[{ value: 10, name: '10' }, { value: 20, name: '20' }, { value: 30, name: '30' }, { value: 50, name: '50' }, { value: 100, name: '100' }]}
            placeholder="Search"
            onChange={this.onChangeLimit}
          />
        </div>
        <span className="m-datatable__pager-detail">
          <span className="pager-detail__label">Displaying</span>{` ${start + 1} - ${finish} of ${total} records`}
        </span>
      </div>
    );
  }
}

NumberPerPage.propTypes = {

  /**
   * Number of the first element on the page
   */
  start: PropTypes.number,

  /**
   * Number of the last element on the page
   */
  limit: PropTypes.number,

  /**
   * Number of items
   */
  total: PropTypes.number,

  /**
   * Call to change number of the page
   */
  onChange: PropTypes.func
};

NumberPerPage.defaultProps = {
  start: 0,
  limit: 10,
  total: 0,
  onChange() {}
};

export default NumberPerPage;
