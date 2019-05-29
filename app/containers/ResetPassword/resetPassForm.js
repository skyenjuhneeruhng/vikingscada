import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { password, equals, required } from './../validation';

import { RenderInput } from './../../components/FormRenderers';
import Button from '../../components/UIKit/Button';

const validateConfirmPass = equals('password');

const ResetPasswordForm = (props) => {
  const {
    submitting, handleSubmit, back
  } = props;

  return (
    <form className="m-login__form m-form" onSubmit={handleSubmit}>
      <div className="form-group m-form__group">
        <Field
          type="password"
          name="password"
          component={RenderInput}
          id="password"
          placeholder="Password"
          validate={[required, password]}
        />
        <Field
          type="password"
          name="passwordConfirmation"
          component={RenderInput}
          id="passwordConfirmation"
          placeholder="Confirm password"
          validate={[required, validateConfirmPass]}
        />
      </div>
      <div className="m-login__form-action">
        <Button
          label="Change"
          type="submit"
          id="m_login_forget_password_submit"
          className="signin"
          handleClick={submitting}
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

ResetPasswordForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'ResetPasswordForm'
})(ResetPasswordForm);
