import React from 'react';
import PropTypes from 'prop-types';

import { rnd } from '../charts/fake_data_generator';

/**
 * Generating a user avatar
 */
export class Avatar extends React.Component {
  /**
   * Return first letter from name
   *
   * @param {string} name
   * @public
   */
  getLetter(name) {
    return name.charAt(0);
  }

  /**
   * Return random color
   *
   * @public
   */
  randomColor() {
    const colors = ['#3b6291', '#3fc5dd', '#4da2f6'];
    return colors[Math.round(rnd(0, 3))];
  }

  render() {
    const {
      name, img
    } = this.props;
    return (
      img ? <img src={`../img/${img}`} alt="" /> : <div style={{ backgroundColor: this.randomColor() }} className="like-logo">{this.getLetter(name) }</div>
    );
  }
}

Avatar.propTypes = {
  /**
   * User name
   */
  name: PropTypes.string,
  /**
   * User picture
   */
  img: PropTypes.string
};

Avatar.defaultProps = {
  name: '',
  img: ''
};

export default Avatar;
