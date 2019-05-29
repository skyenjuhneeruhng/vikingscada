import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { required, email, phoneNumber, password, equals, minLength, onlySpaces, phoneMask } from '../../../validation';

import { RenderInputRow, InputAutoComplete } from '../../../../components/FormRenderers';

import Button from '../../../../components/UIKit/Button';

const validateConfirmPass = equals('password');
const validateUsername = minLength(3, 'Username is too short');

class NewViewer extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;
    this.state = {
      companyId: data.viewer_company && data.viewer_company._id,
      siteId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.edit && nextProps.data.viewer_company &&
      (this.props.data.viewer_company !== nextProps.data.viewer_company)
    ) {
      this.setState({
        companyId: nextProps.data.viewer_company._id,
        siteId: nextProps.data.site_viewer ? nextProps.data.site_viewer._id : ''
      });
    }
  }

  onSubmit = (data) => {
    const { companyId, siteId } = this.state;
    this.props.onSubmit({
      ...data,
      viewer_company: companyId,
      site_viewer: siteId
    });
  }

  setCompanyId = (id) => {
    this.setState(
      !id ? { companyId: '', siteId: '' } : { companyId: id }
    );
  }

  setSiteId = (id) => {
    this.setState({
      siteId: id
    });
  }

  renderManagerDetails() {
    const {
      edit, role, showChangePass
    } = this.props;
    const { companyId, siteId } = this.state;

    return (
      <Fragment>
        <div className="col-md-6">
          <Field
            component={RenderInputRow}
            type="text"
            name="first_name"
            labelText="* First Name:"
            className="secondary"
            id="first_name"
            spanText=""
            validate={[required, onlySpaces]}
          />
          <Field
            component={RenderInputRow}
            type="text"
            name="last_name"
            labelText="* Last Name:"
            className="secondary"
            id="last_name"
            validate={[required, onlySpaces]}
          />
          <Field
            component={RenderInputRow}
            type="text"
            name="username"
            labelText="* Username:"
            className="secondary"
            id="username"
            validate={[required, validateUsername, onlySpaces]}
          />
          <Field
            type="text"
            name="email"
            component={RenderInputRow}
            className="secondary"
            id="email"
            labelText="* Email:"
            validate={[required, email]}
          />
          <Field
            component={InputAutoComplete}
            type="text"
            name="viewer_company"
            labelText="* Company:"
            className="secondary"
            id="company"
            validate={[required]}
            entity="company"
            searchName="company_name_contains"
            changeId={this.setCompanyId}
            editId={companyId}
            placeholder="Type your company name"
            disabled={role === 'company' || role === 'managers'}
          />
          <Field
            component={InputAutoComplete}
            type="text"
            name="site_viewer"
            labelText="* Site:"
            className="secondary"
            id="site_viewer"
            validate={[required]}
            changeId={this.setSiteId}
            editId={siteId}
            searchName="name_contains"
            placeholder="Type your site name"
            entity={role === 'root' ? `site?company=${companyId}` : 'account/site'}
            disabled={!companyId}
          />
        </div>
        <div className="col-md-6">
          <Field
            type="text"
            name="phone"
            component={RenderInputRow}
            className="secondary"
            id="phone"
            labelText="* Phone:"
            validate={[required, phoneNumber]}
            {...phoneMask}
          />
          { !edit ?
            <Fragment>
              <Field
                component={RenderInputRow}
                type="password"
                name="password"
                labelText="* Password:"
                className="secondary"
                id="password"
                validate={[required, password, onlySpaces]}
              />
              <Field
                component={RenderInputRow}
                type="password"
                name="repassword"
                labelText="* Confirm Password:"
                className="secondary"
                id="repassword"
                validate={[required, validateConfirmPass]}
              />
            </Fragment> :
            <div className="change-password-settings">
              <Button
                label="Change Password"
                id="change_password"
                className="primary"
                type="button"
                handleClick={showChangePass}
              />
            </div>
          }
        </div>
      </Fragment>
    );
  }

  render() {
    const {
      submitting, pristine, handleSubmit
    } = this.props;

    const { companyId, siteId } = this.state;

    return (
      <Fragment>
        <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit(this.onSubmit)} >
          <div className="row edit-company-form">
            {this.renderManagerDetails()}
          </div>
          <div className="m-login__form-action text-right edit-form-bottom">
            <Button
              label="Save Viewer"
              id="update_company_submit"
              className="signup edit-profile-save-btn"
              type="submit"
              disabled={pristine || submitting || !companyId || !siteId}
            />
            <Button
              label="Cancel"
              id="cancel_company_submit"
              className="secondary"
              type="button"
              handleClick={() => push(window.history.back())}
            />
          </div>
        </form>
      </Fragment>
    );
  }
}

NewViewer.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  showChangePass: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired
};

const form = reduxForm({
  form: 'NewViewerForm',
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(NewViewer);

function mapStateToProps(state, props) {
  let entity = {};
  if (props.edit) {
    entity = {
      ...props.data,
      viewer_company: props.data.viewer_company && props.data.viewer_company.company_name,
      site_viewer: props.data.site_viewer && props.data.site_viewer.name,
      phone: String(props.data && props.data.phone)
    };
  } else {
    entity = {
      viewer_company: props.data.viewer_company && props.data.viewer_company.company_name
    };
  }

  return {
    initialValues: entity
  };
}

export default connect(mapStateToProps, { push })(form);
