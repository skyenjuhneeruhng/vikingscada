import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { Link } from 'react-router-dom';
import ProfileMenu from '../../../../containers/ProfilePage/components/ProfileMenu';
import Button from '../../../UIKit/Button';

import Avatar from '../../../Avatar';

import { logout } from './../../../../containers/SignIn/actions';

/**
 * User Dropdown
 */
export class UserPanelDropdown extends React.Component {
  render() {
    const {
      name, img, email
    } = this.props;

    return (
      <div className="m-dropdown__wrapper" style={{ zIndex: '101' }} id="user-panel">
        <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{ left: 'auto', right: '12.5px' }} />
        <div className="m-dropdown__inner">
          <div className="m-dropdown__header m--align-center">
            <div className="m-card-user m-card-user--skin-dark">
              <div className="m-card-user__pic">
                <Avatar name={name} img={img} />
              </div>
              <div className="m-card-user__details">
                <span className="m-card-user__name m--font-weight-500">
                  {/* <Link to="/"> */}
                  {name}
                  {/* </Link> */}
                </span>
                <a href="" className="m-card-user__email m--font-weight-300 m-link">
                  {email}
                </a>
              </div>
            </div>
          </div>
          <div className="m-dropdown__body">
            <div className="m-dropdown__content user-profile">
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
      </div>
    );
  }
}

UserPanelDropdown.propTypes = {
  /**
   * Called when the user leaves the site
   */
  logout: PropTypes.func.isRequired,
  /**
   * User name
   */
  name: PropTypes.string,
  /**
   * User email
   */
  email: PropTypes.string,
  /**
   * User picture
   */
  img: PropTypes.string
};

UserPanelDropdown.defaultProps = {
  name: '',
  email: '',
  img: ''
};

export default connect(null, { logout })(UserPanelDropdown);
