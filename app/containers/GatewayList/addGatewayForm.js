import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required } from './../validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const AddGatewayForm = ({
  pristine, submitting, handleSubmit, hide, show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Add Gateway</Modal.Title>
    </Modal.Header>
    <form className="content m-form" onSubmit={handleSubmit} >
      <Modal.Body>
        <Field
          component={RenderInput}
          name="name"
          className="secondary"
          id="name"
          placeholder="Enter gateway name"
          type="text"
          validate={[required]}
        // spanText="gateway name description"
        />
        <Field
          component={RenderInput}
          name="desc"
          className="secondary"
          id="description"
          placeholder="Enter gateway description"
          type="text"
        // spanText="gateway description description"
        />
      </Modal.Body>
      <div className="m-form__actions m-form__actions--solid">
        <div className="row align-items-center">
          <div className="col m--align-left m--valign-middle">
            <div className="alert alert-success m-alert m-alert--icon m-alert--square m--margin-bottom-0" role="alert">
              <div className="m-alert__icon">
                <i className="flaticon-exclamation" />
              </div>
              <div className="m-alert__text">
                After creating the gateway, save the firmware file
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal.Footer>
        <Button
          label="Create"
          id="gateway_submit"
          className="signup edit-profile-save-btn"
          type="submit"
          disabled={pristine || submitting}
        />
        <Button
          label="Cancel"
          id="gateway_cancel"
          className="secondary"
          type="button"
          handleClick={hide}
        />
      </Modal.Footer>
    </form>
  </Modal>
);

AddGatewayForm.propTypes = {
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func,
  hide: PropTypes.func,
  show: PropTypes.bool
};

AddGatewayForm.defaultProps = {
  submitting: false,
  pristine: false,
  handleSubmit: () => { },
  hide: () => { },
  show: false

};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('AddGatewayForm'));


export default reduxForm({
  form: 'AddGatewayForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: afterSubmit
})(AddGatewayForm);

