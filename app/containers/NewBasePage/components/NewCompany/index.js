import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { email, required, phoneNumber, equals, zipCode, minLength, password, onlySpaces, phoneMask } from '../../../validation';
import { RenderInputRow } from '../../../../components/FormRenderers';
import Button from '../../../../components/UIKit/Button';

const validateConfirmPass = equals('password');
const validateUsername = minLength(3, 'Username is too short');

const renderClientDetails = () => (
  <Fragment>
    <div className="col-md-6">
      <Field
        component={RenderInputRow}
        type="text"
        name="first_name"
        labelText="* First Name:"
        className="secondary"
        id="first_name"
        validate={[required, onlySpaces]}
      />
      <Field
        component={RenderInputRow}
        type="text"
        name="last_name"
        labelText="* Last Name:"
        className="secondary"
        id="last_name"
        validate={[required, onlySpaces]}
      />
      <Field
        component={RenderInputRow}
        type="text"
        name="username"
        labelText="* Username:"
        className="secondary"
        id="username"
        validate={[required, validateUsername, onlySpaces]}
      />
      <Field
        component={RenderInputRow}
        type="email"
        name="email"
        labelText="* Email:"
        className="secondary"
        id="email"
        validate={[required, email]}
      />
    </div>
    <div className="col-md-6">
      <Field
        component={RenderInputRow}
        type="text"
        name="phone"
        labelText="* Phone:"
        className="secondary"
        id="phone"
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
        validate={[required, password, onlySpaces]}
      />
      <Field
        component={RenderInputRow}
        type="password"
        name="repassword"
        labelText="* Confirm Password:"
        className="secondary"
        id="repassword"
        validate={[required, validateConfirmPass]}
      />
    </div>
  </Fragment>
);

const renderCompanyDetails = () => (
  <Fragment>
    <div className="col-md-6">
      <Field
        component={RenderInputRow}
        type="text"
        name="company_name"
        labelText="* Company Name:"
        className="secondary"
        id="company_name"
        validate={[required, onlySpaces]}
      />
      <Field
        type="text"
        name="address"
        labelText="* Address"
        component={RenderInputRow}
        className="secondary"
        id="address"
        validate={[required, onlySpaces]}
      />
    </div>
    <div className="col-md-6">
      <Field
        type="text"
        name="state"
        labelText="* State"
        component={RenderInputRow}
        className="secondary"
        id="state"
        validate={[required, onlySpaces]}
      />
      <Field
        type="text"
        name="zipcode"
        labelText="* Zip Code"
        component={RenderInputRow}
        className="secondary"
        id="zipcode"
        validate={[required, zipCode]}
      />
    </div>
  </Fragment>
);


const NewCompany = ({
  submitting, pristine, handleSubmit
}) => (
  <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit} >
    <div className="row edit-company-form">
      {renderClientDetails()}
    </div>
    <header className="form-header">Company Details</header>
    <div className="row edit-company-form">
      {renderCompanyDetails()}
    </div>
    <div className="m-login__form-action text-right edit-form-bottom">
      <Button
        label="Save Company"
        id="update_company_submit"
        className="signup edit-profile-save-btn"
        type="submit"
        disabled={pristine || submitting}
      />
      <Button
        label="Cancel"
        id="cancel_company_submit"
        className="secondary"
        type="button"
        handleClick={() => push(window.history.back())}
      />
    </div>
  </form>
);

NewCompany.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const form = reduxForm({
  form: 'NewCompanyForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(NewCompany);

export default connect(null, { push })(form);
