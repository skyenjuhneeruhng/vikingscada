import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Breadcrumbs from '../../components/Breadcrumbs';
import EditProfile from './components/EditProfile';

import { getProfile, updateProfile, updateMe } from './../ProfilePage/actions';

class EditProfilePage extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.profile)) {
      this.props.getProfile();
    }
  }

  onSubmit = (data) => {
    const {
      id, first_name, last_name, username, phone, email
    } = data;

    if (this.props.profile.role && this.props.profile.role.type === 'root') {
      this.props.updateMe(id, {
        first_name, last_name, username, phone, email
      }, false);
    } else {
      this.props.updateMe(id, {
        first_name, last_name, username, phone, email
      });
    }
  }
  render() {
    return (
      <div className="m-grid__item m-grid__item--fluid m-wrapper edit-company">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                My settings
              </h3>
              <Breadcrumbs current="Edit profile" />
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
                        My Profile
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="m-portlet__body edit-company">
                  <EditProfile
                    onSubmit={this.onSubmit}
                    data={this.props.profile}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  profile: PropTypes.instanceOf(Object),
  getProfile: PropTypes.func,
  // updateProfile: PropTypes.func,
  updateMe: PropTypes.func
};

EditProfilePage.defaultProps = {
  profile: {},
  getProfile() {},
  // updateProfile() {},
  updateMe() {}
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps, {
  getProfile, updateProfile, updateMe
})(EditProfilePage);
