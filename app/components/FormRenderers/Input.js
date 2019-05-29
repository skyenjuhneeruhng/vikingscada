import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from './../UIKit/Input';

const RenderInput = ({
  input,
  spanText,
  meta: { touched, error },
  ...custom
}) => (
  <Fragment>
    <Input
      {...input}
      {...custom}
      error={touched && error}
    />
    {spanText && (!touched || !error) &&
      <span className="m-form__help">
        {spanText}
      </span>
    }
  </Fragment>
);

RenderInput.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  spanText: PropTypes.string
};
RenderInput.defaultProps = {
  spanText: undefined
};

export default RenderInput;
