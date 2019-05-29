import React from 'react';

const PlanHead = () => (
  <tr className="m-datatable__row">
    <th className="m-datatable__cell m-datatable__cell--users">
      <span className="m-datatable__cell-name">
        Name
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-description">
        Description
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-numbers">
        Megabytes
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-numbers">
        Price
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-actions">Actions</span>
    </th>
  </tr>
);

export default PlanHead;
