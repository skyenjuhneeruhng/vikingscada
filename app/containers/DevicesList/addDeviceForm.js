import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, number } from './../validation';
import { RenderInputRow, RenderSelect } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const AddDeviceForm = ({
  pristine, submitting, handleSubmit, hide, show, gateways
}) => (
  <Modal show={show} className="add-device">
    <Modal.Header>
      <Modal.Title>Add Device</Modal.Title>
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
      {/* {notRoot ?
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
        </div> : null
      } */}
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

AddDeviceForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  gateways: PropTypes.instanceOf(Object).isRequired
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('AddDeviceForm'));

export default reduxForm({
  form: 'AddDeviceForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: afterSubmit
})(AddDeviceForm);

