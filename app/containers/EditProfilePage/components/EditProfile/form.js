import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { required, email, phoneNumber, phoneMask } from '../../..//validation';
import { RenderInputRow } from '../../../../components/FormRenderers';
// import FileSelector from './../../../../components/FormRenderers/FileSelector';

import Button from '../../../../components/UIKit/Button';

const renderProfileDetails = (showChangePass, root) => (
  <Fragment>
    {/* <div className="col-lg-2 col-md-12">
      <Field
        name="image"
        component={FileSelector}
        url="ads"
      />
    </div> */}
    <div className="col-lg-6 col-md-12">
      <Field
        component={RenderInputRow}
        type="text"
        name="first_name"
        labelText="* First Name:"
        className="secondary"
        id="first_name"
        placeholder="Enter your first name"
        spanText=""
        validate={[required]}
      />
      <Field
        component={RenderInputRow}
        type="text"
        name="last_name"
        labelText="* Last Name:"
        className="secondary"
        id="last_name"
        validate={[required]}
        placeholder="Enter your last name"
      />
      <Field
        component={RenderInputRow}
        type="text"
        name="username"
        labelText="* Username:"
        className="secondary"
        id="username"
        validate={[required]}
        placeholder="Enter your username"
      />
    </div>
    <div className="col-lg-6 col-md-12">
      <Field
        type="text"
        name="email"
        component={RenderInputRow}
        className="secondary"
        id="email"
        labelText="* Email:"
        validate={[required, email]}
        placeholder="Enter email"
      />
      {
        !root && <Field
          type="text"
          name="phone"
          component={RenderInputRow}
          className="secondary"
          id="phone"
          labelText="* Phone:"
          validate={[required, phoneNumber]}
          placeholder="Phone number"
          {...phoneMask}
        />
      }
      <div className="form-group m-form__group row has-danger change-password-settings">
        <Button
          label="Change Password"
          id="change_password"
          className="primary"
          type="button"
          handleClick={showChangePass}
        />
      </div>
    </div>
  </Fragment>
);

class EditProfile extends Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    initialize(initialValues);
  }

  render() {
    const {
      submitting, pristine, handleSubmit, showChangePass, cancel, root
    } = this.props;
    return (
      <form className="m-form m-form--fit" onSubmit={handleSubmit} >
        <div className="row edit-company-form">
          {renderProfileDetails(showChangePass, root)}
        </div>
        <div className="m-login__form-action edit-form-bottom text-right">
          <Button
            label="Save Changes"
            id="update_company_submit"
            className="signup edit-profile-save-btn"
            type="submit"
            disabled={pristine || submitting}
          />
          {cancel && <Button
            label="Cancel"
            id="cancel_company_submit"
            className="secondary"
            type="button"
            handleClick={() => this.props.push('/')}
          />}
        </div>
      </form>
    );
  }
}

EditProfile.propTypes = {
  cancel: PropTypes.bool.isRequired,
  root: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showChangePass: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.func.isRequired
};


const form = reduxForm({
  form: 'EditProfileForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditProfile);

function mapStateToProps(state, props) {
  const { phone } = props.data;

  const data = {
    ...props.data,
    phone: phone && phone.toString()
  };
  return {
    initialValues: data
  };
}

export default connect(mapStateToProps, { push })(form);
