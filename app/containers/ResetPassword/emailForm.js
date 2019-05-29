import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { email, required } from './../validation';
import Button from '../../components/UIKit/Button';
import { RenderInput } from './../../components/FormRenderers';

const ForgotPasswordForm = (props) => {
  const {
    submitting, handleSubmit, back
  } = props;

  return (
    <form className="m-login__form m-form" onSubmit={handleSubmit}>
      <div className="form-group m-form__group">
        <Field
          type="email"
          name="email"
          component={RenderInput}
          id="email"
          placeholder="Email"
          validate={[required, email]}
        />
      </div>
      <div className="m-login__form-action">
        <Button
          label="Reset"
          type="submit"
          id="m_login_forget_password_submit"
          className="signin"
          disabled={submitting}
        />
        <Button
          label="Cancel"
          id="m_login_forget_password_cancel"
          className="out"
          disabled={submitting}
          handleClick={back}
        />
      </div>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'ForgotPasswordForm'
})(ForgotPasswordForm);
