import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { required, number } from './../validation';

import { RenderInput } from './../../components/FormRenderers';
import Button from '../../components/UIKit/Button';

const VerifyForm = (props) => {
  const {
    submitting, handleSubmit
  } = props;

  return (
    <form className="m-login__form m-form" onSubmit={handleSubmit}>
      <Field
        type="text"
        name="code"
        component={RenderInput}
        id="code"
        placeholder="Code"
        validate={[required, number]}
      />
      <div className="row">
        <div className="col m--align-center">
          <Link to="/verify" id="m_login_forget_password" className="m-link">
            Not received code?
          </Link>
        </div>
      </div>
      <div className="m-login__form-action">
        <Button
          type="submit"
          label="Verify"
          id="m_login_signin_submit"
          className="signin"
          disabled={submitting}
        />
      </div>
    </form>
  );
};

VerifyForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'VerifyForm'
})(VerifyForm);
