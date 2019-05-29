import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirm } from '../../components/Modal/util/confirm';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getCompany } from './../../api_helper';

import NewCompanyForm from './components/NewCompany';
import NewSiteForm from './components/NewSite';
import NewManagerForm from './components/NewManager';
import NewViewerForm from './components/NewViewer';

import { signUpWithoutVer } from '../SignUp/actions';
import { addNewEntity, getEntityById, updateEntityById, deleteEntityById } from './actions';
import { updateProfile } from '../ProfilePage/actions';
import { getCompanyById, changeDefaultIndex } from '../EditCompanyPage/actions';

import ChangePassFrom from '../EditProfilePage/components/EditProfile/changePassForm';
/**
 * Component for creating new users (company, site, menager, viewer)
 *
 */
export default (type, edit = false) => {
  class NewBasePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showChangePass: false
      };

      let route = type;
      if (route === 'managers' || route === 'viewers') {
        route = 'user';
      }
      if (this.props.userRole === 'company') {
        route = `account/${type}`;
      }
      if (this.props.userRole === 'managers') {
        if (type === 'site') {
          route = 'account/site/me';
        } else {
          route = `account/${type}`;
        }
      }

      if (props.match.params.id && edit) {
        props.getEntityById(
          this.props.userRole === 'managers' && type === 'site' ? '' : props.match.params.id,
          route
        );
      }

      if (this.props.userRole === 'root' && !edit && props.match.params.id) {
        props.getCompanyById(props.match.params.id);
      }
    }

    /**
     * Call to create new company
     *
     * @param {string} repassword
     * @param {object} data
     */
    onSubmitCompany = ({ repassword, ...data }) => {
      this.props.signUpWithoutVer(data);
    }
    /**
     * Call to create new site
     *
     * @param {object} data
     */

    onSubmitSite = (data) => {
      const {
        name, location, company, type: companyType
      } = data;
      const newData = {
        name, location, company, type: companyType
      };

      let route = type;
      let redirect = `/company/${company}`;
      const { userRole } = this.props;
      if (userRole === 'company') {
        // this.props.changeDefaultIndex(1);
        redirect = '/company';
        route = `account/${type}`;
      } else if (userRole === 'managers') {
        // this.props.changeDefaultIndex(1);
        redirect = '/company';
        route = 'account/site/me';
      }
      redirect = `${redirect}/sites`;
      if (edit) {
        const oldData = this.props.site && this.props.site.company;
        if (userRole === 'root' && oldData.id !== newData.company) {
          confirm('Assign This Site to Another Company? This change will not affect users assigned to this Site. To reassign users, change their Company.', { label: 'Assign' }).then(() => {
            this.props.updateEntityById(
              userRole === 'managers' ? '' : this.props.match.params.id,
              newData,
              route,
              redirect
            );
          }, () => {
          });
        } else {
          this.props.updateEntityById(
            userRole === 'managers' ? '' : this.props.match.params.id,
            newData,
            route,
            redirect
          );
        }
      } else {
        this.props.addNewEntity(newData, route, redirect);
      }
    }

    onSubmitManager = (data) => {
      const { manager_company } = data;
      const { match } = this.props;

      let route = type;
      let redirect = this.getRedirectForMember('managers', manager_company);
      if (this.props.userRole === 'root' && !edit) {
        route = `${type}/${data.manager_company}`;
      }
      if (this.props.userRole === 'root' && edit) {
        route = 'user';
      }
      if (this.props.userRole === 'company' || this.props.userRole === 'managers') {
        // this.props.changeDefaultIndex(2);
        redirect = '/company/managers';
        route = `account/${type}`;
      }
      if (edit) {
        this.props.updateEntityById(match.params.id, data, route, redirect);
      } else {
        this.props.addNewEntity(data, route, redirect);
      }
    }

    onSubmitViewer = (data) => {
      const { viewer_company, ...newData } = data;
      const { match } = this.props;

      let route = type;
      let redirect = this.getRedirectForMember('viewers', viewer_company);
      if (this.props.userRole === 'root') {
        route = `${type}/${viewer_company}`;
      }

      if (this.props.userRole === 'root' && edit) {
        route = 'user';
      }
      if (this.props.userRole === 'company' || this.props.userRole === 'managers') {
        // this.props.changeDefaultIndex(3);
        redirect = '/company/viewers';
        route = `account/${type}`;
      }

      if (edit) {
        this.props.updateEntityById(match.params.id, newData, route, redirect);
      } else {
        this.props.addNewEntity(newData, route, redirect);
      }
    }

    onChangePassSubmit = (data) => {
      const { new_password } = data;
      // const { match } = this.props;
      // const { id } = match.params;
      const redirect = this.props.userRole === 'root' ? `../${type}` : `../company/${type}`;
      this.props.updateEntityById(
        this.props.match.params.id,
        { password: new_password },
        this.props.userRole === 'root' ? 'user' : `account/${type}`,
        redirect
      );
      this.hideChangePass();
    }

    getRedirectForMember(memberType, companyId) {
      const { location, match } = this.props;
      if (location.state && location.state.from) {
        return location.state.from;
      } else if (match.params.id) {
        return `/company/${companyId}/${memberType}`;
      }
      return `/${memberType}`;
    }

    deleteEntity = (e) => {
      e.preventDefault();
      let route = type;
      let redirect = route;
      if (route === 'managers' || route === 'viewers') {
        route = 'user';
      } else if (route === 'site' && this.props.userRole === 'root') {
        redirect = `company/${this.props.match.params.id}`;
      }

      if (this.props.userRole === 'company') {
        route = `account/${type}`;
        if (route === 'managers' || route === 'viewers') {
          redirect = `${redirect.substring(0, redirect.length - 1)}s`;
        }
      }

      let count = 1;

      switch (type) {
        case 'site': count = 1; break;
        case 'managers': count = 2; break;
        case 'viewers': count = 3; break;
        default: count = 1;
      }

      confirm(`Are you sure, that you want to delete this ${type}?`).then(() => {
        this.props.deleteEntityById(this.props.match.params.id, route, redirect);
        this.props.changeDefaultIndex(count);
      }, () => {
      });
    }
    /**
     * Call to render links for breadcrumbs
     *
     */
    returnLink() {
      const data = this.props.site;
      if (this.props.userRole === 'root') {
        const company = {
          name: !edit ? this.props.editCompany.company_name : (data.manager_company && data.manager_company.company_name) || (data.viewer_company && data.viewer_company.company_name),
          id: !edit ? this.props.match.params.id : (data.manager_company && data.manager_company._id) || (data.viewer_company && data.viewer_company._id)
        };

        switch (type) {
          case 'company':
            return [{ label: 'Companies', link: 'companies' }];
          case 'site':
            return [{ label: 'Companies', link: 'companies' }, { label: company.name, link: `company/${company.id}/details` }];
          case 'managers':
            return this.props.match.params.id ?
              [{ label: 'Companies', link: 'companies' }, { label: company.name, link: `company/${company.id}/details` }] :
              [{ label: 'Managers', link: 'managers' }];
          case 'viewers':
            return this.props.match.params.id ?
              [{ label: 'Companies', link: 'companies' }, { label: company.name, link: `company/${company.id}/details` }] :
              [{ label: 'Viewers', link: 'viewers' }];
          default:
            return [{ label: 'Companies', link: 'companies' }];
        }
      } else {
        return [{
          label: this.props.company.company_name,
          link: 'company/details'
        }];
      }
    }

    showChangePass = () => {
      this.setState({
        showChangePass: true
      });
    }

    hideChangePass = () => {
      this.setState({
        showChangePass: false
      });
    }

    /**
     * Call to render form
     *
     */
    renderForm() {
      let data = this.props.site;

      const { userRole, company, editCompany } = this.props;

      let companyId = (this.props.entity && this.props.entity.companyId) || '';

      if (userRole === 'company' && !edit && type === 'site') {
        data = { company };
        companyId = company.id;
      }
      if (userRole === 'root' && !edit && type === 'site') {
        data = { company: { ...editCompany } };
        companyId = editCompany.id;
      }

      if (userRole === 'company' && !edit && type === 'managers') {
        data = { manager_company: this.props.company };
        companyId = company.id;
      }

      if (userRole === 'root' && !edit && type === 'managers') {
        data = { manager_company: editCompany };
        companyId = editCompany.id;
      }

      if (userRole === 'company' && edit && type === 'managers') {
        companyId = data.manager_company && data.manager_company.id;
      }
      if (userRole === 'managers' && edit && type === 'managers') {
        companyId = data.company && data.company.id;
      }

      if (userRole === 'company' && !edit && type === 'viewers') {
        data = { viewer_company: company };
        companyId = company.id;
      }

      if (userRole === 'root' && !edit && type === 'viewers') {
        data = { viewer_company: editCompany };
        companyId = editCompany.id;
      }

      if (userRole === 'managers' && !edit && type === 'viewers') {
        data = { viewer_company: company };
        companyId = company.id;
      }

      if (userRole === 'company' && edit && type === 'viewers') {
        companyId = data.site_viewer && data.site_viewer.id;
      }

      if (userRole === 'root' && edit && type === 'managers') {
        companyId = data.manager_company && data.manager_company.id;
      }

      if (userRole === 'root' && edit && type === 'viewers') {
        companyId = data.viewer_company && data.viewer_company.id;
      }

      if (userRole === 'root' && !edit && type === 'site') {
        companyId = this.props.match.params.id;
      }
      switch (type) {
        case 'company':
          return (
            <NewCompanyForm onSubmit={this.onSubmitCompany} />
          );
        case 'site':
          return (
            <NewSiteForm
              onSubmit={this.onSubmitSite}
              edit={edit}
              data={data}
              role={userRole}
              companyId={companyId}
            />);
        case 'managers':
          return (
            <NewManagerForm
              onSubmit={this.onSubmitManager}
              edit={edit}
              data={data}
              role={userRole}
              companyId={companyId}
              showChangePass={this.showChangePass}
            />
          );
        case 'viewers':
          return (
            <NewViewerForm
              onSubmit={this.onSubmitViewer}
              edit={edit}
              data={data}
              role={userRole}
              companyId={companyId}
              showChangePass={this.showChangePass}
            />
          );
        default:
          return (
            <NewCompanyForm onSubmit={this.onSubmitCompany} edit={edit} />
          );
      }
    }

    render() {
      let newEntity = type;
      let currentEntity = this.props.site.name || '';
      if (type === 'managers' || type === 'viewers') {
        newEntity = type.substring(0, type.length - 1);
        currentEntity = `${this.props.site.first_name} ${this.props.site.last_name}` || '';
      }
      let companyHeader = '';
      if (type === 'company') {
        companyHeader = 'Client Details';
      }
      newEntity = `New ${newEntity}`;

      return (
        <div className="m-grid__item m-grid__item--fluid m-wrapper edit-company new-company">
          <div className="m-subheader ">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="m-subheader__title ">
                  {edit ? currentEntity : newEntity}
                </h3>
                <Breadcrumbs pages={this.returnLink()} current={edit ? currentEntity : newEntity} />
              </div>
            </div>
          </div>
          <div className="m-content">
            <div className="row">
              <div className="col-md-12">
                <div className="m-portlet m-portlet--tabs">
                  <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                      <div className="m-portlet__head-title">
                        <h3 className="m-portlet__head-text">
                          {edit ? currentEntity : companyHeader || newEntity}
                        </h3>
                      </div>
                    </div>
                    {edit ?
                      <div className="m-portlet__head-tools">
                        <ul className="m-portlet__nav">
                          <li className="m-portlet__nav-item">
                            { (this.props.userRole === 'root' || this.props.userRole === 'company') &&
                              <a
                                href="/"
                                onClick={this.deleteEntity}
                                className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill"
                                title="Delete"
                              >
                                <i className="la la-trash" />
                              </a>
                            }
                          </li>
                        </ul>
                      </div> : null
                    }
                  </div>
                  <div className="m-portlet__body">
                    {this.renderForm()}
                    {
                      <ChangePassFrom
                        show={this.state.showChangePass}
                        onSubmit={this.onChangePassSubmit}
                        hideChangePass={this.hideChangePass}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  NewBasePage.propTypes = {
    /**
     * Call to create new company without verification
     */
    signUpWithoutVer: PropTypes.func.isRequired,
    /**
     * Call to create new site
     */
    addNewEntity: PropTypes.func.isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    site: PropTypes.instanceOf(Object).isRequired,
    userRole: PropTypes.instanceOf(Object).isRequired,
    company: PropTypes.instanceOf(Object).isRequired,
    editCompany: PropTypes.instanceOf(Object).isRequired,
    getEntityById: PropTypes.func.isRequired,
    updateEntityById: PropTypes.func.isRequired,
    deleteEntityById: PropTypes.func.isRequired,
    changeDefaultIndex: PropTypes.func.isRequired,
    getCompanyById: PropTypes.func.isRequired,
    entity: PropTypes.string.isRequired
  };

  /**
   * Binding data from store, return props for component
   *
   * @param {object} state
   * @public
   */
  function mapStateToProps(state) {
    const { profile } = state;
    return {
      site: state.sites,
      entity: state.entities.entitiesInfo,
      userRole: profile.role && profile.role.type,
      company: getCompany(profile),
      editCompany: state.company.company
    };
  }

  return connect(mapStateToProps, {
    signUpWithoutVer, addNewEntity, getEntityById, updateEntityById, deleteEntityById, updateProfile, changeDefaultIndex, getCompanyById
  })(NewBasePage);
};
