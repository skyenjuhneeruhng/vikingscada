import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { RenderCheckbox } from './../../../../components/FormRenderers';

import Button from '../../../../components/UIKit/Button';


const renderAlarmDetails = () => (
  <Fragment>
    <div className="col-md-6">
      <header className="form-header">SMS</header>
      <Field
        type="checkbox"
        name="alert_sms_admin"
        component={RenderCheckbox}
        id="alert_sms_admin"
        label="Admin"
      />
      <Field
        type="checkbox"
        name="alert_sms_managers"
        component={RenderCheckbox}
        id="alert_sms_managers"
        label="Managers"
      />
      <Field
        type="checkbox"
        name="alert_sms_viewers"
        component={RenderCheckbox}
        id="alert_sms_viewers"
        label="Viewers"
      />
    </div>
    <div className="col-md-6">
      <header className="form-header">Email</header>
      <Field
        type="checkbox"
        name="alert_email_admin"
        component={RenderCheckbox}
        id="alert_email_admin"
        label="Admin"
      />
      <Field
        type="checkbox"
        name="alert_email_managers"
        component={RenderCheckbox}
        id="alert_email_managers"
        label="Managers"
      />
      <Field
        type="checkbox"
        name="alert_email_viewers"
        component={RenderCheckbox}
        id="alert_email_viewers"
        label="Viewers"
      />
    </div>
  </Fragment>
);

export class Messages extends React.Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    initialize(initialValues);
  }

  render() {
    const {
      submitting, handleSubmit, pristine, canEdit
    } = this.props;

    return (
      <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit} >
        <div className="row edit-company-form">
          <div className="col-md-4">
            <div className="row">
              { canEdit ? renderAlarmDetails() : null }
            </div>
          </div>
        </div>
        <div className="m-login__form-action text-right edit-form-bottom">
          {canEdit &&
            <Fragment>
              <Button
                label="Save"
                id="update_company_submit"
                className="signup"
                type="submit"
                disabled={pristine || submitting}
              />
              <Button
                label="Cancel"
                id="cancel_company_submit"
                className="secondary"
                type="button"
                handleClick={() => this.props.push(window.history.back())}
              />
            </Fragment>
          }
        </div>
      </form>
    );
  }
}

Messages.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired,
  canEdit: PropTypes.bool
};

Messages.defaultProps = {
  canEdit: true
};

const form = reduxForm({
  form: 'MessagesForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(Messages);

function mapStateToProps(state, props) {
  const {
    company_name, address, state: companyState, zipcode,
    alert_sms_admin, alert_sms_managers, alert_sms_viewers,
    alert_email_admin, alert_email_managers, alert_email_viewers
  } = props.data;

  return {
    initialValues: {
      company_name, address, state: companyState, zipcode, alert_sms_admin, alert_sms_managers, alert_sms_viewers, alert_email_admin, alert_email_managers, alert_email_viewers
    }
  };
}

export default connect(mapStateToProps, { push })(form);
