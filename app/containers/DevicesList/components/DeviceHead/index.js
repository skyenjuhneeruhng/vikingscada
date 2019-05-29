import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DeviceHead = ({ data, profile }) => {
  const type = profile && profile.role && profile.role.type;
  const managerId = profile && profile.site_manager && profile.site_manager.id;

  return (
    <tr className="m-datatable__row">
      <th className="m-datatable__cell m-datatable__cell--users">
        <span className="m-datatable__cell-name">
          Name
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-gateway">
          Gateway
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-number">
          Serial Number
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-number">
          Software Version
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-number">
          Location
        </span>
      </th>
      {((type === 'company') || type === 'root' || (type === 'managers' && (managerId === data.siteId))) && (
        <th className="m-datatable__cell">
          <span className="m-datatable__cell-actions">Actions</span>
        </th>
      )}
    </tr>
  );
};

DeviceHead.propTypes = {
  profile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object)
};

DeviceHead.defaultProps = {
  profile: {},
  data: {}
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(DeviceHead);
