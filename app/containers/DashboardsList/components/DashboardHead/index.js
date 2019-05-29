import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SiteHead = ({ data, profile }) => (
  <tr className="m-datatable__row">
    <th className="m-datatable__cell m-datatable__cell--users">
      <span className="m-datatable__cell-name">
        Name
      </span>
    </th>
    <th className="m-datatable__cell">
      <span className="m-datatable__cell-alerts">
        Alerts
      </span>
    </th>
    {((profile.role && profile.role.type) === 'company' || (profile.role && profile.role.type) === 'root' || ((profile.role && profile.role.type) === 'managers' && (profile && profile.site_manager.id) === data.siteId)) && (
      <th className="m-datatable__cell">
        <span className="m-datatable__cell-actions">Actions</span>
      </th>
    )}
  </tr>
);

SiteHead.propTypes = {
  profile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object)
};

SiteHead.defaultProps = {
  profile: {},
  data: {}
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(SiteHead);
