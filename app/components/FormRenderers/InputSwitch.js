import React from 'react';
import PropTypes from 'prop-types';

const RenderCheckbox = ({
  input,
  label,
  className,
  ...custom
}) => (
  <div className="has-danger">
    <label htmlFor={custom.id} className={`switch ${className}`}>
      <input
        {...input}
        {...custom}
      />
      <span className="slider round" />
    </label>
  </div>
);

RenderCheckbox.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired
};

export default RenderCheckbox;

