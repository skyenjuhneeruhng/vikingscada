import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { email, required } from './../validation';

import { RenderInput, RenderCheckbox } from './../../components/FormRenderers';
import Button from '../../components/UIKit/Button';

const SignInForm = (props) => {
  const {
    submitting, handleSubmit
  } = props;

  return (
    <form className="m-login__form m-form" onSubmit={handleSubmit}>
      <Field
        type="email"
        name="identifier"
        component={RenderInput}
        id="identifier"
        placeholder="Email"
        validate={[required, email]}
      />
      <Field
        type="password"
        name="password"
        component={RenderInput}
        id="password"
        placeholder="Password"
        validate={[required]}
      />
      <div className="row m-login__form-sub">
        <div className="col m--align-left">
          <Field
            type="checkbox"
            name="remember"
            component={RenderCheckbox}
            id="remember"
            label="Remember me"
            normalize={(v) => !!v}
          />
        </div>
        <div className="col m--align-right">
          <Link to="/reset-password" id="m_login_forget_password" className="m-link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="m-login__form-action">
        <Button
          type="submit"
          label="Log In"
          id="m_login_signin_submit"
          className="signin"
          disabled={submitting}
        />
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'SignInForm',
  initialValues: {
    remember: false
  }
})(SignInForm);
