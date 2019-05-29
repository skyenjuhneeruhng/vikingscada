import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required } from './../validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const EditGatewayForm = ({
  pristine, submitting, handleSubmit, hide, show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Edit gateway</Modal.Title>
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
        />
        <Field
          component={RenderInput}
          name="desc"
          className="secondary"
          id="description"
          placeholder="Enter gateway description"
          type="text"
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
                After editing the gateway, save the firmware file
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal.Footer>
        <Button
          label="Update"
          id="gateway_submit"
          className="signup edit-profile-save-btn"
          type="submit"
          disabled={pristine || submitting}
        />
        <Button
          label="Cancel"
          id="Gateway_cancel"
          className="secondary"
          type="button"
          handleClick={hide}
        />
      </Modal.Footer>
    </form>
  </Modal>
);

EditGatewayForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const form = reduxForm({
  form: 'EditGatewayForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditGatewayForm);

function mapStateToProps(state, props) {
  return {
    initialValues: props.data
  };
}

export default connect(mapStateToProps)(form);
