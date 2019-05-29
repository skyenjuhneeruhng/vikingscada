import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../../../components/Avatar';

export class UserPanel extends React.Component {
  render() {
    const {
      name, img, email
    } = this.props;
    return (
      <div className="m-card-profile">
        <div className="m-card-profile__title m--hide">
          Your Profile
        </div>
        <div className="m-card-profile__pic">
          <div className="m-card-profile__pic-wrapper">
            <Avatar name={name} img={img} />
          </div>
        </div>
        <div className="m-card-profile__details">
          <span className="m-card-profile__name">
            {name}
          </span>
          <a href="" className="m-card-profile__email m-link">
            {email}
          </a>
        </div>
      </div>
    );
  }
}

UserPanel.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  email: PropTypes.string
};

UserPanel.defaultProps = {
  name: 'User Name',
  img: 'user.jpg',
  email: ''
};

export default UserPanel;
