import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { confirm } from '../../components/Modal/util/confirm';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getCompany } from './../../api_helper';

import NewSiteForm from '../NewBasePage/components/NewSite';

import { getEntityById, updateEntityById, deleteEntityById } from '../NewBasePage/actions';
import { updateProfile } from '../ProfilePage/actions';
import { changeDefaultIndex } from '../EditCompanyPage/actions';

/**
 * Component for editing site
 *
 */
class EditSitePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangePass: false
    };

    const type = 'site';
    let route = type;

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

    if (props.match && props.match.params && props.match.params.id) {
      props.getEntityById(
        this.props.userRole === 'managers' && type === 'site' ? '' : props.match.params.id,
        route
      );
    }
  }

  /**
   * Call to edit site
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

    let route = 'site';
    let redirect = `/company/${company}`;
    const { userRole } = this.props;
    if (userRole === 'company') {
      // this.props.changeDefaultIndex(1);
      redirect = '/company';
      route = 'account/site';
    } else if (userRole === 'managers') {
      // this.props.changeDefaultIndex(1);
      redirect = '/company';
      route = 'account/site/me';
    }
    redirect = `${redirect}/sites`;

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
  }

  deleteEntity = (e) => {
    e.preventDefault();
    let route = 'site';

    if (this.props.userRole === 'company') {
      route = `account/${route}`;
    }

    confirm('Are you sure, that you want to delete this site?').then(() => {
      this.props.deleteEntityById(this.props.match.params.id, route, `company/${this.props.match.params.id}`);
      this.props.changeDefaultIndex(1);
    }, () => {
    });
  }
  /**
   * Call to render links for breadcrumbs
   *
   */
  returnLink() {
    const { site } = this.props;
    if (this.props.userRole === 'root') {
      return [{ label: 'Companies', link: 'companies' }, { label: site.company && site.company.company_name, link: `company/${site.company && site.company.id}/details` }];
    }
    return [{
      label: this.props.company && this.props.company.company_name,
      link: 'company/details'
    }];
  }


  /**
   * Call to render form
   *
   */
  renderForm() {
    const data = this.props.site;

    const { userRole } = this.props;

    const companyId = (this.props.entity && this.props.entity.companyId) || '';

    return (
      <NewSiteForm
        onSubmit={this.onSubmitSite}
        edit
        data={data}
        role={userRole}
        companyId={companyId}
      />);
  }

  render() {
    const currentEntity = (this.props.site && this.props.site.name) || '';
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper edit-company new-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                {currentEntity}
              </h3>
              <Breadcrumbs pages={this.returnLink()} current={currentEntity} />
            </div>
          </div>
        </div>
        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet m-portlet--tabs">
                <div className="m-portlet__head">
                  <div className="m-portlet__head-caption full-with-sm">
                    <br />
                    <ul className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                      <li className="nav-item m-tabs__item react-tabs__tab--selected">Site details</li>
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../gateways/${this.props.site && this.props.site.id}`}>Gateways</Link>
                      </li>
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../devices/${this.props.site && this.props.site.id}`}>Devices</Link>
                      </li>
                      <li className="nav-item m-tabs__item nav-item__padding-none">
                        <Link to={`../sensors/${this.props.site && this.props.site.id}`}>Sensors</Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="m-portlet__head-tools">
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
                  </div> */}
                </div>
                <div className="m-portlet__body">
                  {this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditSitePage.propTypes = {
  match: PropTypes.instanceOf(Object),
  site: PropTypes.instanceOf(Object),
  userRole: PropTypes.string,
  company: PropTypes.instanceOf(Object),
  getEntityById: PropTypes.func,
  updateEntityById: PropTypes.func,
  deleteEntityById: PropTypes.func,
  changeDefaultIndex: PropTypes.func,
  entity: PropTypes.string
};

EditSitePage.defaultProps = {
  match: {},
  site: {},
  userRole: '',
  company: {},
  getEntityById() {},
  updateEntityById() {},
  deleteEntityById() {},
  changeDefaultIndex() {},
  entity: ''
};

/**
 * Binding data from store, return props for component
 *
 * @param {object} state
 * @public
 */
function mapStateToProps(state) {
  const { profile, entities } = state;
  return {
    site: state.sites,
    entity: entities && entities.entitiesInfo,
    userRole: profile && profile.role && profile.role.type,
    company: getCompany(profile)
  };
}

export default connect(mapStateToProps, {
  getEntityById, updateEntityById, deleteEntityById, updateProfile, changeDefaultIndex
})(EditSitePage);
