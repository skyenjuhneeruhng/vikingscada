import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

import { required } from './../validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from './../../components/UIKit/Button';

const EditDashboardForm = ({
  pristine, submitting, handleSubmit, hide, show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Edit Dashboard</Modal.Title>
    </Modal.Header>
    <form className="content" onSubmit={handleSubmit} >
      <Modal.Body>
        <Field
          component={RenderInput}
          name="name"
          className="secondary"
          id="name"
          placeholder="Enter dashboard name"
          type="text"
          validate={[required]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          label="Save"
          id="dashboard_submit"
          className="signup edit-profile-save-btn"
          type="submit"
          disabled={pristine || submitting}
        />
        <Button
          label="Cancel"
          id="dashboard_cancel"
          className="secondary"
          type="button"
          handleClick={hide}
        />
      </Modal.Footer>
    </form>
  </Modal>
);

EditDashboardForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const form = reduxForm({
  form: 'EditDashboardForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditDashboardForm);

function mapStateToProps(state, props) {
  return {
    initialValues: {
      name: props.name
    }
  };
}

export default connect(mapStateToProps)(form);
