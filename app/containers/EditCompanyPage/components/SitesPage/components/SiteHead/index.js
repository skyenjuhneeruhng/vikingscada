import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const checkSortMark = (elName, sortName, sortType) => {
  const type = sortType === 'asc' ? 'down' : 'up';
  return sortName === elName && <i className={`la la-arrow-${type}`} />;
};

const SiteHead = ({ onClick, sort }) => {
  const [sortName, sortType] = sort.split(':');
  return (
    <tr className="m-datatable__row">
      <th className="m-datatable__cell m-datatable__cell--users sort" onClick={onClick('name')}>
        <span className="m-datatable__cell-name">
          Site Name{checkSortMark('name', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell sort" onClick={onClick('location')}>
        <span className="m-datatable__cell-location">
          Location{checkSortMark('location', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-actions">Actions</span>
      </th>
    </tr>
  );
};

SiteHead.propTypes = {
  onClick: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SiteHead);
