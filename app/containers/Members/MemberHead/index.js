import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const checkSortMark = (elName, sortName, sortType) => {
  const type = sortType === 'asc' ? 'down' : 'up';
  return sortName === elName && <i className={`la la-arrow-${type}`} />;
};

const MemberHead = ({
  onClick, sort, data
}) => {
  const [sortName, sortType] = sort.split(':');
  return (
    <tr className="m-datatable__row">
      <th className="m-datatable__cell m-datatable__cell--users">
        <span className="m-datatable__cell-name">User</span>
      </th>
      <th className="m-datatable__cell sort" onClick={onClick('email')}>
        <span className="m-datatable__cell-email">
          Email{checkSortMark('email', sortName, sortType)}
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-sites">Site</span>
      </th>
      <th className="m-datatable__cell sort" onClick={onClick('updatedAt')}>
        <span className="m-datatable__cell-date">
          Date{checkSortMark('updatedAt', sortName, sortType)}
        </span>
      </th>
      { !data.hide &&
        <Fragment>
          <th className="m-datatable__cell">
            <span className="m-datatable__cell-status">Status</span>
          </th>
          <th className="m-datatable__cell">
            <span className="m-datatable__cell-actions">Actions</span>
          </th>
        </Fragment>
      }
    </tr>
  );
};

MemberHead.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.instanceOf(Object).isRequired,
  sort: PropTypes.string
};

MemberHead.defaultProps = {
  onClick: () => {},
  sort: ''
};

export default connect(null)(MemberHead);
