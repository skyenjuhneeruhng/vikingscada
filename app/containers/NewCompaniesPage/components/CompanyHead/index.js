import React from 'react';
import PropTypes from 'prop-types';

const checkSortMark = (elName, sortName, sortType) => {
  const type = sortType === 'asc' ? 'down' : 'up';
  return sortName === elName && <i className={`la la-arrow-${type}`} />;
};

const CompanyHead = ({ onClick, sort }) => {
  const [sortName, sortType] = sort.split(':');
  return (
    <tr className="m-datatable__row">
      <th className="m-datatable__cell m-datatable__cell--users" width="20px">
        <span className="m-datatable__cell-arrow" />
      </th>
      <th className="m-datatable__cell m-datatable__cell--users sort" onClick={onClick('company_name')}>
        <span className="m-datatable__cell-name">
          Company{checkSortMark('company_name', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-sites">Site</span>
      </th>
      <th className="m-datatable__cell sort" onClick={onClick('state')}>
        <span className="m-datatable__cell-state">
          State{checkSortMark('state', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell sort" onClick={onClick('updatedAt')}>
        <span className="m-datatable__cell-date">
          Date{checkSortMark('updatedAt', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-status">Status</span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-actions">Actions</span>
      </th>
    </tr>
  );
};

CompanyHead.propTypes = {
  onClick: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired
};

export default CompanyHead;
