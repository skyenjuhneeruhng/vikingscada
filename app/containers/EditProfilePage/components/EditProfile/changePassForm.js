import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, password, equals } from '../../../validation';
import { RenderInput } from '../../../../components/FormRenderers';

import Button from '../../../../components/UIKit/Button';

const validateConfirmPass = equals('new_password');

const ChangePassFrom = ({
  pristine, submitting, handleSubmit, hideChangePass, show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Change Password</Modal.Title>
    </Modal.Header>
    <form className="content" onSubmit={handleSubmit} >
      <Modal.Body>
        <Field
          component={RenderInput}
          name="new_password"
          className="secondary"
          id="new_password"
          placeholder="Enter your new password"
          type="password"
          validate={[required, password]}
        />
        <Field
          component={RenderInput}
          name="confirm_password"
          className="secondary"
          id="confirm_password"
          placeholder="Confirm your new password"
          type="password"
          validate={[required, validateConfirmPass]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          label="Save"
          id="change_pass_submit"
          className="signup edit-profile-save-btn"
          type="submit"
          disabled={pristine || submitting}
        />
        <Button
          label="Cancel"
          id="update_company_submit"
          className="secondary"
          type="button"
          handleClick={hideChangePass}
        />
      </Modal.Footer>
    </form>
  </Modal>
);

ChangePassFrom.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideChangePass: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'ChangePassFrom',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: (result, dispatch) => dispatch(reset('ChangePassFrom'))
})(ChangePassFrom);
