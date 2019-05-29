import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { zipCode, required, number } from './../../../validation';
import { RenderInputRow } from './../../../../components/FormRenderers';
import FileSelector from './../../../../components/FormRenderers/FileSelector';

import Button from '../../../../components/UIKit/Button';

const renderCompanyDetails = (canEdit, role, company_logo) => (
  <Fragment>
    <div className="col-md-2">
      <Field
        name="company_logo"
        component={FileSelector}
        url={`${company_logo && company_logo.hash}${company_logo && company_logo.ext}`}
        disabled={!canEdit}
      />
    </div>
    <div className="col-md-5">
      <Field
        component={RenderInputRow}
        type="text"
        name="company_name"
        labelText="Company Name"
        className="secondary"
        id="company_name"
        placeholder=""
        spanText=""
        validate={[required]}
        disabled={!canEdit}
      />
      <Field
        type="text"
        name="address"
        component={RenderInputRow}
        className="secondary"
        id="address"
        labelText="Address"
        validate={[required]}
        disabled={!canEdit}
      />
      {
        role ?
          <Field
            component={RenderInputRow}
            type="text"
            name="add_traffic"
            labelText="Add Traffic"
            className="secondary"
            id="add_traffic"
            validate={[number]}
            disabled={!canEdit}
          />
          : null
      }
    </div>
    <div className="col-md-5">
      <Field
        type="text"
        name="state"
        component={RenderInputRow}
        className="secondary"
        id="state"
        labelText="State"
        validate={[required]}
        disabled={!canEdit}
      />
      <Field
        type="text"
        name="zipcode"
        component={RenderInputRow}
        className="secondary"
        id="zipcode"
        labelText="ZIP Code"
        validate={[required, zipCode]}
        disabled={!canEdit}
      />
    </div>
  </Fragment>
);

export class EditCompany extends React.Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    initialize(initialValues);
  }

  render() {
    const {
      submitting, handleSubmit, pristine, canEdit, role, initialValues
    } = this.props;

    const company_logo = initialValues && initialValues.company_logo;

    return (
      <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit} >
        <div className="row edit-company-form">
          {renderCompanyDetails(canEdit, role === 'root', company_logo)}
        </div>
        {/* <div className="row edit-company-form mailing">
          <div className="col-md-4">
            <div className="row">
              { canEdit ? renderAlarmDetails() : null }
            </div>
          </div>
        </div> */}
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

EditCompany.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired,
  canEdit: PropTypes.bool,
  role: PropTypes.string.isRequired
};

EditCompany.defaultProps = {
  canEdit: true
};

const form = reduxForm({
  form: 'EditCompanyForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(EditCompany);

function mapStateToProps(state, props) {
  const {
    company_name, address, state: companyState, zipcode,
    alert_sms_admin, alert_sms_managers, alert_sms_viewers,
    alert_email_admin, alert_email_managers, alert_email_viewers, company_logo
  } = props.data;

  return {
    initialValues: {
      company_name, address, state: companyState, zipcode, alert_sms_admin, alert_sms_managers, alert_sms_viewers, alert_email_admin, alert_email_managers, alert_email_viewers, company_logo
    }
  };
}

export default connect(mapStateToProps, { push })(form);
