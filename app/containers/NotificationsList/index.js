import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { confirm } from '../../components/Modal/util/confirm';

import Breadcrumbs from '../../components/Breadcrumbs';
import NotificationsList from './components/NotificationsList';
import Messages from './components/Messages';


// import SmsList from './components/SmsPage';
// import EmailList from './components/EmailPage';

import { updateMe } from './../ProfilePage/actions';

const TABS = {
  root: ['details', 'admin', 'sites', 'managers', 'viewers'],
  company: ['details', 'sites', 'managers', 'viewers']
};


export class EditCompanyPage extends React.Component {
  constructor(props) {
    super(props);

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

  // componentWillReceiveProps(nextProps) {
  //   if (!_.isEmpty(this.props.company) && this.props.company.first_name !== nextProps.company.first_name) {
  //     this.props.getCompanyById(this.props.profile.id);
  //   }
  // }

  onSubmitMessages = (data) => {
    console.log('data', data);
    if (!data.alert_email_admin && !data.alert_email_managers && !data.alert_email_viewers &&
    !data.alert_sms_admin && !data.alert_sms_managers && !data.alert_sms_viewers) {
      confirm('We recommend to select at least one Email, SMS alarm, or both to ensure the assigned users are notified of any alarm events',
        { label: 'Save', className: 'signup signup-popup' }).then(() => {
        this.props.updateMe(this.props.profile.id, data);
      }, () => {
      });
    } else {
      this.props.updateMe(this.props.profile.id, data);
    }
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
      profile, location
    } = this.props;

    const type = profile && profile.role && profile.role.type;

    const tabData = {
      role: type,
      id: type === 'root' ?
        location.pathname.split('/')[2] :
        profile.id
    };

    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                Alarms
              </h3>
              <Breadcrumbs current="Alarms" />
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
                        Alarms
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="m-portlet__body">
                  <Tabs>
                    <TabList className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--primary">
                      <Fragment>
                        <Tab className="nav-item m-tabs__item">Message</Tab>
                        <Tab className="nav-item m-tabs__item">Voice</Tab>
                        {/* <Tab className="nav-item m-tabs__item">Email</Tab> */}
                      </Fragment>
                    </TabList>

                    <TabPanel>
                      <Messages onSubmit={this.onSubmitMessages} data={this.props.profile && this.props.profile.company_admin} />
                    </TabPanel>

                    <TabPanel>
                      <NotificationsList
                        type="voice"
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
  updateMe
})(EditCompanyPage);
