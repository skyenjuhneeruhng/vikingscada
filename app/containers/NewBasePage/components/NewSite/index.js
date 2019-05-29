import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { required, onlySpaces } from '../../../validation';
import { RenderInputRow, InputAutoComplete, RenderSelect } from '../../../../components/FormRenderers';

import Button from '../../../../components/UIKit/Button';

class NewSite extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      companyId: data && data.company && data.company._id
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setCompanyId(nextProps.data.company.id);
    }
  }

  onSubmit = (data) => {
    this.props.onSubmit({
      ...data,
      company: this.state.companyId
    });
  }

  setCompanyId = (id) => {
    this.setState({
      companyId: id
    });
  }

  renderSite() {
    const { role } = this.props;

    return (
      <Fragment>
        <div className="col-md-6">
          <Field
            component={RenderInputRow}
            type="text"
            name="name"
            labelText="* Name:"
            className="secondary"
            id="site_name"
            validate={[required, onlySpaces]}
          />
          <Field
            component={RenderInputRow}
            type="text"
            name="location"
            labelText="* Location:"
            className="secondary"
            id="location"
            validate={[required, onlySpaces]}
          />
        </div>
        <div className="col-md-6">
          <Field
            component={InputAutoComplete}
            type="text"
            name="company"
            labelText="* Company:"
            className="secondary"
            id="company"
            validate={[required]}
            entity="company"
            searchName="company_name_contains"
            editId={this.state.companyId}
            changeId={this.setCompanyId}
            placeholder="Type your company name"
            disabled={role === 'company' || role === 'managers'}
          />
          <Field
            component={RenderSelect}
            name="type"
            labelText=" Type:"
            className="secondary"
            option={[{
                value: '',
                name: 'Choose type of site'
              }, {
                value: 'Gas',
                name: 'Gas'
              }, {
                value: 'Oil',
                name: 'Oil'
              }, {
                value: 'Wastewater',
                name: 'Wastewater'
              }, {
                value: 'Water',
                name: 'Water'
              }]}
            id="type"
            validate={[required]}
          />
        </div>
      </Fragment>
    );
  }

  render() {
    const {
      submitting, handleSubmit, pristine
    } = this.props;

    return (
      <Fragment>
        <form className="m-form m-form--fit m-form--label-align-right" onSubmit={handleSubmit(this.onSubmit)} >
          <div className="row edit-company-form">
            {this.renderSite()}
          </div>
          <div className="m-login__form-action text-right edit-form-bottom">
            <Button
              label="Save Site"
              id="update_company_submit"
              className="signup edit-profile-save-btn"
              type="submit"
              disabled={pristine || submitting || !this.state.companyId}
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

NewSite.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  role: PropTypes.string.isRequired
};

const form = reduxForm({
  form: 'NewSiteForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  }
})(NewSite);

function mapStateToProps(state, props) {
  let entity = {};

  if (props.edit) {
    entity = { ...props.data, company: props.data && props.data.company && props.data.company.company_name };
  } else {
    entity = { company: props.data && props.data.company && props.data.company.company_name };
  }
  return {
    initialValues: entity
  };
}
export default connect(mapStateToProps, { push })(form);
