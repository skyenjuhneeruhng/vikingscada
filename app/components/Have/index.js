import React from 'react';
import PropTypes from 'prop-types';

const Have = ({ permission, permissions, children }) => (
  permissions[permission] && children
);

Have.propTypes = {
  permission: PropTypes.string.isRequired,
  permissions: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Array).isRequired
};

export default Have;
