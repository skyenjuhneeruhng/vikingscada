import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import EditProfileForm from './form';
import ChangePassFrom from './changePassForm';

import { getProfile, updateProfile, updateMe } from '../../../ProfilePage/actions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangePass: false
    };
  }

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
      this.props.updateProfile(id, {
        first_name, last_name, username, phone, email
      }, false);
    } else {
      this.props.updateMe(id, {
        first_name, last_name, username, phone, email
      });
    }
  }

  onChangePassSubmit = (data) => {
    const { new_password } = data;
    if (this.props.profile.role && this.props.profile.role.type === 'root' && this.props.adminID) {
      this.props.updateProfile(this.props.adminID, {
        password: new_password
      }, false);
    } else {
      this.props.updateMe(this.props.profile.id, {
        password: new_password
      });
    }
    this.hideChangePass();
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

  render() {
    return (
      <Fragment>
        <EditProfileForm
          onSubmit={this.props.onSubmit || this.onSubmit}
          showChangePass={this.showChangePass}
          cancel={this.props.cancel}
          data={this.props.data}
          root={this.props.profile && this.props.profile.role && this.props.profile.role.type === 'root'}
        />
        <ChangePassFrom
          show={this.state.showChangePass}
          onSubmit={this.onChangePassSubmit}
          hideChangePass={this.hideChangePass}
        />
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object),
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  updateMe: PropTypes.func,
  onSubmit: PropTypes.func,
  cancel: PropTypes.bool,
  adminID: PropTypes.string
};

EditProfile.defaultProps = {
  profile: {},
  data: {},
  getProfile() {},
  updateProfile() {},
  updateMe() {},
  cancel: true,
  onSubmit: null,
  adminID: ''
};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps, {
  getProfile, updateProfile, updateMe
})(EditProfile);
