import React from 'react';
import PropTypes from 'prop-types';

const RenderCheckbox = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <div className="has-danger">
    <label htmlFor={custom.id} className="m-checkbox m-checkbox--air m-checkbox--state-warning">
      <input
        {...input}
        {...custom}
      />
      {label} <br />
      <span />
      {touched && error && <div className="form-control-feedback">{error}</div>}
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
