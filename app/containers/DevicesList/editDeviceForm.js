import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, number } from './../validation';
import { RenderInputRow, RenderSelect } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const EditDeviceForm = ({
  pristine, submitting, handleSubmit, hide, show, gateways
}) => (
  <Modal show={show} className="add-device">
    <Modal.Header>
      <Modal.Title>Edit Device</Modal.Title>
    </Modal.Header>
    <form className="content m-form" onSubmit={handleSubmit} >
      <Modal.Body>
        <div className="row">
          <div className="col-sm-6">
            <Field
              component={RenderInputRow}
              labelText="* Name"
              name="name"
              className="secondary"
              id="name"
              placeholder="Enter device name"
              type="text"
              validate={[required]}
              // spanText="Device name"
            />
            <Field
              component={RenderInputRow}
              labelText="* Serial Number"
              name="serial_number"
              className="secondary"
              id="serial_number"
              placeholder="Enter device serial number"
              type="text"
              validate={[required]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Software Version"
              name="software_version"
              className="secondary"
              id="software_version"
              placeholder="Enter software version"
              type="text"
              validate={[required]}
            />
          </div>
          <div className="col-sm-6">
            <Field
              component={RenderInputRow}
              labelText="* Modbus ID"
              name="modbus_id"
              className="secondary"
              id="modbus_id"
              placeholder="Enter modbus id"
              type="text"
              validate={[required, number]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Location"
              name="location"
              className="secondary"
              id="location"
              placeholder="Enter location"
              type="text"
              validate={[required]}
            />
            <Field
              component={RenderSelect}
              name="gateway"
              labelText="* Gateway"
              className="secondary"
              option={gateways}
              id="gateway"
              validate={[required]}
            />
          </div>
        </div>
      </Modal.Body>
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

EditDeviceForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  gateways: PropTypes.instanceOf(Object).isRequired
};

const form = reduxForm({
  form: 'EditDeviceForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditDeviceForm);

function mapStateToProps(state, props) {
  return {
    initialValues: props.data
  };
}

export default connect(mapStateToProps)(form);
