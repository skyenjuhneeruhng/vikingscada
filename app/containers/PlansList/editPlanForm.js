import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required, number, posNumber, price } from './../validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const EditPlanForm = ({
  pristine, submitting, handleSubmit, hide, show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Edit plan</Modal.Title>
    </Modal.Header>
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
        />
        <Field
          component={RenderInput}
          name="desc"
          className="secondary"
          id="description"
          placeholder="Enter plan description"
          type="text"
          validate={[required]}
        />
        <Field
          component={RenderInput}
          name="mb"
          className="secondary"
          id="mb"
          placeholder="Enter number of megabytes"
          type="text"
          validate={[required, number, posNumber]}
        />

        <Field
          component={RenderInput}
          name="price"
          className="secondary"
          id="price"
          placeholder="Enter plan's price"
          type="text"
          validate={[required, number, posNumber, price]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          label="Update"
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
    </form>
  </Modal>
);

EditPlanForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const form = reduxForm({
  form: 'EditPlanForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditPlanForm);

function mapStateToProps(state, props) {
  return {
    initialValues: props.data
  };
}

export default connect(mapStateToProps)(form);
