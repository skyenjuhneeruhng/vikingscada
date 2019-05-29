import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '../../components/UIKit/Button';
import Alert from '../../components/Alert';
import Breadcrumbs from '../../components/Breadcrumbs';

import ProfileMenu from './components/ProfileMenu';
import UserPanel from './components/UserPanel';
import UserInfo from './components/UserInfo';

// import EditProfile from './../EditProfile';

import { logout } from './../SignIn/actions';

import { getProfile, getPendingCount } from './actions';

/**
 * Profile Page
 */
export class ProfilePage extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.profile)) {
      this.props.getProfile();
    }

    if (this.props.profile && this.props.profile.role && this.props.profile.role.type === 'root') {
      this.props.getPendingCount();
    }
  }

  renderAlert() {
    const { profile } = this.props;
    const { company_admin } = profile || {};
    const type = profile && profile.role && profile.role.type;
    const status = (type === 'company' && company_admin) ? company_admin && company_admin.status : profile && profile.status;

    if (status === 'pending') {
      return <Alert type="danger" iconClass="flaticon-exclamation-1" text="Your company profile is pending approval. The verification can take up to 24 hours" />;
    } else if (status === 'rejected') {
      return <Alert type="danger" iconClass="flaticon-exclamation-1" text="Your company profile was not approved in Viking SCADA. For more information, please contact support" />;
    }
    return null;
  }

  render() {
    const { profile } = this.props;
    const type = profile && profile.role && profile.role.type;
    const title = type === 'root' ? 'Waiting for Approval' : 'My Profile';
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper user-profile">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                {title}
              </h3>
              <Breadcrumbs current={title} />
            </div>
          </div>
        </div>
        <div className="m-content">
          {this.renderAlert()}
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <div className="m-portlet m-portlet--full-height">
                <div className="m-portlet__body">
                  <UserPanel name={profile && profile.first_name ? `${profile.first_name} ${profile.last_name}` : ''} img="" email={profile && profile.email ? profile.email : ''} />
                  <ProfileMenu {...this.props} />
                  <div className="m-portlet__body-separator" />
                  <div className="m-widget1 m-widget1--paddingless">
                    <div className="m-widget1__item">
                      <div className="row m-row--no-padding align-items-center">
                        <div className="col">
                          <Button
                            label="Log Out"
                            className="out m-btn--pill"
                            handleClick={this.props.logout}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb">
                <UserInfo type={type} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  /**
   * User profile
   */
  profile: PropTypes.instanceOf(Object),

  /**
   * Call to get user profile
   */
  getProfile: PropTypes.func,

  /**
   * Call to get count for companies whit status pending
   */
  getPendingCount: PropTypes.func,
  /**
   * Called when the user leaves the site
   */
  logout: PropTypes.func
};

ProfilePage.defaultProps = {
  profile: {},
  getProfile: () => {},
  getPendingCount: () => {},
  logout: () => {}
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    waitingApprove: state.waitingApprove
  };
}

export default connect(mapStateToProps, {
  getProfile, logout, getPendingCount
})(ProfilePage);
