import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, number, bitMask, minValue, posNumberWithZero, isMoreValue, requiredValue } from './../validation';
import { RenderInputRow, RenderSelect } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const minSamplingInterval = minValue(30000, 'The value shouldn\'t be less than 30000.');

const validateRequiredValueFrom = requiredValue('engineer_value_from', 'Required');
const validateRequiredValueTo = requiredValue('engineer_value_to', 'Required');
const validateMoreValueTo = isMoreValue('engineer_value_from', 'Engineer Value From should be more than * Engineer Value To');

const AddSensorForm = ({
  pristine, submitting, handleSubmit, hide, show, devices
}) => (
  <Modal show={show} className="add-device">
    <Modal.Header>
      <Modal.Title>Add Sensor</Modal.Title>
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
              placeholder="Enter sensor name"
              type="text"
              validate={[required]}
            // spanText="Device name"
            />
            <Field
              component={RenderInputRow}
              labelText="* Tag Name"
              name="tag_name"
              className="secondary"
              id="tag_name"
              placeholder="Enter sensor tag name"
              type="text"
              validate={[required]}
            />
            <Field
              component={RenderSelect}
              labelText="* Modbus Register Type"
              name="modbus_register_type"
              className="secondary"
              id="modbus_register_type"
              option={[{
                value: '',
                name: 'Choose modbus register type'
              }, {
                value: 'Coils',
                name: 'Coils '
              }, {
                value: 'Discrete',
                name: 'Discrete '
              }, {
                value: 'Input',
                name: 'Input '
              }, {
                value: 'Holding',
                name: 'Holding '
              }
              ]}
              validate={[required]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Modbus Register Address"
              name="modbus_register_address"
              className="secondary"
              id="modbus_register_address"
              placeholder="Enter modbus register address"
              type="text"
              validate={[required, number]}
            />
            <Field
              component={RenderSelect}
              labelText="* Modbus Data Type"
              name="modbus_data_type"
              className="secondary"
              id="modbus_data_type"
              option={[{
                value: '',
                name: 'Choose modbus data type'
              }, {
                value: 'int',
                name: 'integer '
              }
              ]}
              validate={[required]}
            />
            <Field
              component={RenderInputRow}
              labelText="Engineer Value From"
              name="engineer_value_from"
              className="secondary"
              id="engineer_value_from"
              placeholder="Enter engineer value from"
              type="text"
              validate={[number, posNumberWithZero, validateRequiredValueTo]}
            />

            <Field
              component={RenderInputRow}
              labelText="Engineer Value To"
              name="engineer_value_to"
              className="secondary"
              id="engineer_value_to"
              placeholder="Enter engineer value to"
              type="text"
              validate={[number, posNumberWithZero, validateRequiredValueFrom, validateMoreValueTo]}
            />
          </div>
          <div className="col-sm-6">
            <Field
              component={RenderInputRow}
              labelText="* Modbus Data Size (Bytes) "
              name="modbus_data_size_bytes"
              className="secondary"
              id="modbus_data_size_bytes"
              placeholder="Enter modbusb data size"
              type="text"
              validate={[required, number]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Sampling Interval (ms)"
              name="sampling_internal_ms"
              className="secondary"
              id="sampling_internal_ms"
              placeholder="Enter sampling internal"
              type="text"
              validate={[required, number, minSamplingInterval]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Value Multiplier"
              name="value_multiplier"
              className="secondary"
              id="value_multiplier"
              placeholder="Enter value multiplier"
              type="text"
              validate={[required, number]}
            />
            <Field
              component={RenderInputRow}
              labelText="* Units"
              name="units"
              className="secondary"
              id="units"
              placeholder="Enter units"
              type="text"
              validate={[required]}
            />
            <Field
              component={RenderSelect}
              name="device"
              labelText="* Device"
              className="secondary"
              option={devices}
              id="device"
              validate={[required]}
            />
            <Field
              component={RenderInputRow}
              labelText=" Bit Mask"
              name="bitmask"
              className="secondary"
              id="bitmask"
              placeholder="Enter bit mask"
              type="text"
              validate={[bitMask]}
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

AddSensorForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  devices: PropTypes.instanceOf(Object).isRequired
};


const afterSubmit = (result, dispatch) =>
  dispatch(reset('AddSensorForm'));

export default reduxForm({
  form: 'AddSensorForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: afterSubmit
})(AddSensorForm);
