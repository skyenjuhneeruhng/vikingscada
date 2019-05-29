import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, number, posNumber, price } from './../validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const AddPlanForm = ({
  pristine, submitting, handleSubmit, hide, show, notRoot
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Add plan</Modal.Title>
    </Modal.Header>
    {
      notRoot ?
        <form className="content m-form" onSubmit={handleSubmit} >
          <Modal.Body>
            <Field
              component={RenderInput}
              name="name"
              className="secondary"
              id="name"
              placeholder="Enter plan name"
              type="text"
              validate={[required]}
              // spanText="plan name description"
            />
            <Field
              component={RenderInput}
              name="desc"
              className="secondary"
              id="description"
              placeholder="Enter plan description"
              type="text"
              validate={[required]}
              // spanText="plan description description"
            />

            <Field
              component={RenderInput}
              name="mb"
              className="secondary"
              id="mb"
              placeholder="Enter number of megabytes"
              type="text"
              validate={[required, number, posNumber]}
              // spanText="plan description description"
            />

            <Field
              component={RenderInput}
              name="price"
              className="secondary"
              id="price"
              placeholder="Enter plan's price"
              type="number"
              validate={[required, number, posNumber, price]}
              mask
              // spanText="plan description description"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Create"
              id="plan_submit"
              className="signup edit-profile-save-btn"
              type="submit"
              disabled={pristine || submitting}
            />
            <Button
              label="Cancel"
              id="plan_cancel"
              className="secondary"
              type="button"
              handleClick={hide}
            />
          </Modal.Footer>
        </form> :
        <form className="content m-form" onSubmit={handleSubmit} >
          <Modal.Body>
            <div className="alert m-alert m-alert--icon m-alert--square m--margin-bottom-0" role="alert">
              <div className="m-alert__icon">
                <i className="flaticon-exclamation" />
              </div>
              <div className="m-alert__text">
                You can not create a new plan, a maximum of 3!
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Cancel"
              id="plan_cancel"
              className="secondary"
              type="button"
              handleClick={hide}
            />
          </Modal.Footer>
        </form>
    }

  </Modal>
);

AddPlanForm.propTypes = {
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func,
  hide: PropTypes.func,
  show: PropTypes.bool,
  notRoot: PropTypes.bool
};

AddPlanForm.defaultProps = {
  submitting: false,
  pristine: false,
  handleSubmit: () => {},
  hide: () => {},
  show: false,
  notRoot: false
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('AddPlanForm'));


export default reduxForm({
  form: 'AddPlanForm',
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: afterSubmit
})(AddPlanForm);

