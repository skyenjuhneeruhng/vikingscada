import React from 'react';

const SiteHead = () => (
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
      <span className="m-datatable__cell-data">
        Date
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-status">
        Status
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-status">
        Type
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-payment">
        Payment
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-payment">
        Invoice
      </span>
    </th>
  </tr>
);

export default SiteHead;
