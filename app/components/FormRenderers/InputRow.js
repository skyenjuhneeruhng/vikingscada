import React from 'react';
import PropTypes from 'prop-types';

const RenderInputRow = ({
  input,
  id,
  labelText,
  className,
  spanText,
  meta: { touched, error },
  ...custom
}) => (
  <div className="form-group m-form__group row has-danger">
    <label className="col-form-label col-sm-4" htmlFor={id}>
      {labelText}
    </label>
    <div className="col-sm-8">
      <input
        className={[
          `form-control m-input inpt-${className}`,
          touched && error ? 'inpt-errors' : ''
        ].join(' ')}
        id={id}
        {...input}
        {...custom}
      />
      {touched && error ?
        <div className="form-control-feedback">{error}</div> :
        <span className="m-form__help">{spanText}</span>
      }
    </div>
  </div>
);

RenderInputRow.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string
};
RenderInputRow.defaultProps = {
  className: '',
  labelText: '',
  spanText: ''
};

export default RenderInputRow;
