import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { push, replace } from 'react-router-redux';
import { confirm } from '../../components/Modal/util/confirm';
import { formData } from './../../api_helper';

import Breadcrumbs from '../../components/Breadcrumbs';

import EditProfile from '../EditProfilePage/components/EditProfile';
import EditCompany from './components/EditCompany';

import SitesList from './components/SitesPage';
import ManagersPage from './components/ManagersPage';
import ViewersPage from './components/ViewersPage';

import { getCompanyById, updateCompanyById, deleteCompanyById, changeDefaultIndex } from './actions';
import { updateProfile, updateMe } from './../ProfilePage/actions';

const TABS = {
  root: ['details', 'admin', 'sites', 'managers', 'viewers'],
  company: ['details', 'sites', 'managers', 'viewers']
};

const convToNatural = (number) => (number > 0 ? number : 0);

export class EditCompanyPage extends React.Component {
  constructor(props) {
    super(props);

    if (props.match && props.match.params && props.match.params.id) {
      props.getCompanyById(props.match.params.id);
    }

    this.baseLocation = props.location.pathname.replace(/\/(\w+)$/, ''); // deletes last part in url
  }

  // validateTabName() {
  //   const { match, profile, location } = this.props;
  //   const { tab } = match.params;
  //   const tabs = TABS[profile.role.type] || TABS.company;
  //
  //   if (!tab) {
  //     this.baseLocation = location.pathname.replace(/\/$/, '');
  //     this.props.push(`${this.baseLocation}/details`);
  //   } else if (tabs.indexOf(tab) === -1) {
  //     this.props.replace('/404');
  //   } else {
  //     this.baseLocation = location.pathname.replace(/\/(\w+)$/, ''); // deletes last part in url
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(this.props.company) && this.props.company.first_name !== nextProps.company.first_name) {
      this.props.getCompanyById(this.props.match.params.id);
    }
  }

  onSubmitCompany = (data) => {
    console.log('data', data);
    const correctData = formData(data);
    console.log('correctData', correctData);
    if (this.props.profile.role && this.props.profile.role.type === 'root') {
      this.props.updateCompanyById(this.props.match.params.id, data);
    } else {
      this.props.updateMe(this.props.profile.id, data);
    }
  }

  onSubmitAdmin = (data) => {
    const {
      id, first_name, last_name, username, phone, email
    } = data;

    const newData = {
      id, first_name, last_name, username, phone
    };

    if (email !== this.props.company.admin.email) {
      newData.email = email;
    }

    if (this.props.profile.role && this.props.profile.role.type === 'root') {
      this.props.updateProfile(id, newData, false);
    } else {
      this.props.updateMe(id, newData);
    }
  }

  deleteCompany = (e) => {
    e.preventDefault();
    confirm('Are you sure, that you want to delete this company?').then(() => {
      this.props.deleteCompanyById(this.props.match.params.id);
    }, () => {
    });
  }

  pushToIndex = (e) => {
    e.preventDefault();
    this.props.changeDefaultIndex(+e.target.dataset.index);
  }

  changeUrl = (tabIndex) => {
    const { profile, push: pushState } = this.props;
    const tabs = TABS[profile.role.type] || TABS.company;
    const tab = tabs[tabIndex];
    pushState(`${this.baseLocation}/${tab}`);
  }

  render() {
    const {
      profile, company, match, location
    } = this.props;

    const type = profile && profile.role && profile.role.type;

    const tabData = {
      role: type,
      id: type === 'root' ?
        location.pathname.split('/')[2] :
        profile.id
    };

    console.log('company', company);

    const companyName = company.company_name || (profile.company_admin && profile.company_admin.company_name) || (profile.manager_company && profile.manager_company.company_name) || (profile.viewer_company && profile.viewer_company.company_name);

    const tabs = TABS[type] || TABS.company;
    const tabIndex = convToNatural(
      tabs.indexOf(match.params.tab)
    );

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Company view
              </h3>
              <Breadcrumbs pages={type === 'root' ? [{ label: 'Companies', link: 'companies' }] : null} current={companyName} />
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
                        {companyName}
                      </h3>
                    </div>
                  </div>
                  {
                    type === 'root' ?
                      <div className="m-portlet__head-tools">
                        <ul className="m-portlet__nav">
                          <li className="m-portlet__nav-item">
                            { (tabData.role === 'company' || tabData.role === 'root') &&
                              <a href="/" onClick={this.deleteCompany} className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">
                                <i className="la la-trash" />
                              </a>
                            }
                          </li>
                        </ul>
                      </div> : null
                  }
                </div>
                <div className="m-portlet__body">
                  <Tabs
                    defaultIndex={tabIndex}
                    onSelect={this.changeUrl}
                  >
                    <TabList className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                      {
                        type === 'root' ?
                          <Fragment>
                            <Tab className="nav-item m-tabs__item">Company Details</Tab>
                            <Tab className="nav-item m-tabs__item">Admin Details</Tab>
                            <Tab className="nav-item m-tabs__item">Sites</Tab>
                            <Tab className="nav-item m-tabs__item">Managers</Tab>
                            <Tab className="nav-item m-tabs__item">Viewers</Tab>
                          </Fragment> :
                          <Fragment>
                            <Tab className="nav-item m-tabs__item">Company Details</Tab>
                            <Tab className="nav-item m-tabs__item">Sites</Tab>
                            <Tab className="nav-item m-tabs__item">Managers</Tab>
                            <Tab className="nav-item m-tabs__item">Viewers</Tab>
                          </Fragment>
                      }
                    </TabList>

                    <TabPanel>
                      {type === 'root' ?
                        <EditCompany onSubmit={this.onSubmitCompany} data={this.props.company} role={type} /> :
                        <EditCompany
                          onSubmit={this.onSubmitCompany}
                          data={
                            (tabData.role === 'company' && profile.company_admin) ||
                            (tabData.role === 'managers' && profile.manager_company) ||
                            (tabData.role === 'viewers' && profile.viewer_company)
                          }
                          canEdit={tabData.role === 'company' || tabData.role === 'root'}
                        />
                      }
                    </TabPanel>

                    {type === 'root' ?
                      <TabPanel>
                        <EditProfile
                          onSubmit={this.onSubmitAdmin}
                          formName="EditUserProfile"
                          data={this.props.company.admin}
                          adminID={company && company.admin && company.admin.id}
                        />
                      </TabPanel> : null
                    }
                    <TabPanel>
                      <SitesList
                        {...tabData}
                      />
                    </TabPanel>

                    <TabPanel>
                      <ManagersPage
                        {...tabData}
                      />
                    </TabPanel>

                    <TabPanel>
                      <ViewersPage
                        {...tabData}
                      />
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCompanyPage.propTypes = {
  getCompanyById: PropTypes.func,
  updateProfile: PropTypes.func,
  match: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object),
  company: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  updateCompanyById: PropTypes.func,
  deleteCompanyById: PropTypes.func,
  changeDefaultIndex: PropTypes.func,
  updateMe: PropTypes.func,
  push: PropTypes.func,
  defaultIndex: PropTypes.number
};

EditCompanyPage.defaultProps = {
  getCompanyById() {},
  updateProfile() {},
  match: {},
  location: {},
  company: {},
  profile: {},
  updateCompanyById() {},
  deleteCompanyById() {},
  changeDefaultIndex() {},
  updateMe() {},
  push() {},
  defaultIndex: 0
};

function mapStateToProps(state) {
  return {
    company: state.company && state.company.company,
    profile: state.profile,
    defaultIndex: state.company && state.company.defaultIndex
  };
}

export default connect(mapStateToProps, {
  getCompanyById, updateCompanyById, deleteCompanyById, updateProfile, push, replace, changeDefaultIndex, updateMe
})(EditCompanyPage);
