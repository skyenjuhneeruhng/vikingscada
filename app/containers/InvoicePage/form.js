import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { email, required, phoneNumber, equals, zipCode, password, minLength, onlySpaces, phoneMask } from './../validation';

import { RenderInput, RenderCheckbox, RenderInputRow } from './../../components/FormRenderers';
import Button from '../../components/UIKit/Button';

const validateConfirmPass = equals('password');
const validateUsername = minLength(3, 'Username is too short');

const renderClientDetails = () => (
  <Fragment>
    <Field
      component={RenderInputRow}
      type="text"
      name="first_name"
      labelText="* First Name:"
      className="secondary"
      id="first_name"
      placeholder="Enter your first name"
      spanText="Please enter your first name"
      validate={[required, onlySpaces]}
    />
    <Field
      component={RenderInputRow}
      type="text"
      name="last_name"
      labelText="* Last Name:"
      className="secondary"
      id="last_name"
      placeholder="Enter your last name"
      spanText="Please enter your last name"
      validate={[required, onlySpaces]}
    />
    <Field
      component={RenderInputRow}
      type="text"
      name="username"
      labelText="* Username:"
      className="secondary"
      id="username"
      placeholder="Enter your username"
      spanText="Please enter your username"
      validate={[required, validateUsername, onlySpaces]}
    />
    <Field
      component={RenderInputRow}
      type="email"
      name="email"
      labelText="* Email:"
      className="secondary"
      id="email"
      placeholder="Enter your email"
      spanText="We'll never share your email with anyone else"
      validate={[required, email]}
    />
    <Field
      component={RenderInputRow}
      type="text"
      name="phone"
      labelText="* Phone:"
      className="secondary"
      id="phone"
      placeholder="Enter your phone"
      spanText="Enter your valid phone in US phone format"
      validate={[required, phoneNumber]}
      {...phoneMask}
    />
    <Field
      component={RenderInputRow}
      type="password"
      name="password"
      labelText="* Password:"
      className="secondary"
      id="password"
      placeholder="Enter your password"
      spanText="Please create a strong password"
      validate={[required, password, onlySpaces]}
    />
    <Field
      component={RenderInputRow}
      type="password"
      name="repassword"
      labelText="* Confirm Password:"
      className="secondary"
      id="repassword"
      placeholder="Confirm password"
      spanText="Please retype your password"
      validate={[required, validateConfirmPass]}
    />
  </Fragment>
);

const renderCompanyDetails = () => (
  <Fragment>
    <Field
      component={RenderInputRow}
      type="text"
      name="company_name"
      labelText="* Company Name:"
      className="secondary"
      id="company_name"
      placeholder="Enter company name"
      spanText="Please enter your company name"
      validate={[required, onlySpaces]}
    />
    <div className="form-group m-form__group row">
      <label className="col-form-label col-sm-4" htmlFor="address">
        * Address / State / ZIP Code
      </label>
      <div className="col-sm-8">
        <div className="row">
          <div className="col-sm-4">
            <Field
              type="text"
              name="address"
              component={RenderInput}
              className="secondary"
              id="address"
              placeholder="Enter address"
              spanText="Address"
              validate={[required, onlySpaces]}
            />
          </div>
          <div className="col-sm-4">
            <Field
              type="text"
              name="state"
              component={RenderInput}
              className="secondary"
              id="state"
              placeholder="Enter state"
              spanText="State"
              validate={[required, onlySpaces]}
            />
          </div>
          <div className="col-sm-4">
            <Field
              type="text"
              name="zipcode"
              component={RenderInput}
              className="secondary"
              id="zipcode"
              placeholder="Enter code"
              spanText="ZIP Code"
              validate={[required, zipCode]}
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

const renderTermsAndConditions = () => (
  <div className="form-group m-form__group checkbox-wrp">
    <div className="m--align-left">
      <Field
        type="checkbox"
        name="accept"
        component={RenderCheckbox}
        id="accept"
        label={
          <Fragment>
            I accept the <Link to="/terms" target="_blank">End User License Agreement</Link>
          </Fragment>
        }
        normalize={(v) => !!v}
        validate={[required]}
      />
    </div>
  </div>
);

const SignUpForm = (props) => {
  const {
    submitting, handleSubmit
  } = props;

  return (
    <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit}>
      <div className="m-portlet__body">
        <header className="form-header">Client Details</header>
        {renderClientDetails()}
        <header className="form-header">Company Details</header>
        {renderCompanyDetails()}
        <header className="form-header" />
        {renderTermsAndConditions()}
        <div className="m-login__form-action text-right edit-form-bottom">
          <Button
            label="Register company"
            id="m_login_signin_submit"
            className="signup"
            type="submit"
            disabled={submitting}
          />
        </div>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'SignUpForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(SignUpForm);
