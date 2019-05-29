import React from 'react';

const SiteHead = () => (
  <tr className="m-datatable__row">
    <th className="m-datatable__cell m-datatable__cell--users" width="20px">
      <span className="m-datatable__cell-arrow" />
    </th>
    <th className="m-datatable__cell m-datatable__cell--users">
      <span className="m-datatable__cell-name">
        Widget Name
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-status">
        Notification
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-status">
        Type
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-data">
        Data
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-status">
        Alert
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-payment">
        Value
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-acknowledge">
        Acknowledge
      </span>
    </th>
  </tr>
);

export default SiteHead;
