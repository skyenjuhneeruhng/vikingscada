import React from 'react';

const SiteHead = () => (
  <tr className="m-datatable__row">
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-location">
        Priority
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-name">
        Full name
      </span>
    </th>
    <th className="m-datatable__cell sort">
      <span className="m-datatable__cell-location">
        Role
      </span>
    </th>
    <th className="m-datatable__cell sort">
      <span className="m-datatable__cell-location">
        Email
      </span>
    </th>
    <th className="m-datatable__cell sort">
      <span className="m-datatable__cell-name">
        Phone
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-location">Status</span>
    </th>
  </tr>
);

export default SiteHead;
