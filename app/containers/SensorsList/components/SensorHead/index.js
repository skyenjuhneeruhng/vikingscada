import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SensorHead = ({ data, profile }) => {
  const type = profile && profile.role && profile.role.type;
  const managerId = profile && profile.site_manager && profile.site_manager.id;

  return (
    <tr className="m-datatable__row">
      <th className="m-datatable__cell m-datatable__cell--users" width="20px">
        <span className="m-datatable__cell-arrow" />
      </th>
      <th className="m-datatable__cell m-datatable__cell--users">
        <span className="m-datatable__cell-name">
          Name
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-device">
          Device
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-number">
          Tag Name
        </span>
      </th>
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-number">
          Units
        </span>
      </th>
      {(type === 'company' || type === 'root' || (type === 'managers' && managerId === data.siteId)) && (
        <th className="m-datatable__cell">
          <span className="m-datatable__cell-actions">Actions</span>
        </th>
      )}
    </tr>
  );
};

SensorHead.propTypes = {
  profile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object)
};

SensorHead.defaultProps = {
  profile: {},
  data: {}
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(SensorHead);
