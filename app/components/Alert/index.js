import React from 'react';
import PropTypes from 'prop-types';

/**
 * Alert
 */
export class Alert extends React.Component {
  render() {
    const {
      iconClass, text, type
    } = this.props;
    return (
      <div className={`alert alert-${type} m-alert m-alert--icon m-alert--air m-alert--square m--margin-bottom-30`} role="alert">
        <div className="m-alert__icon">
          <i className={iconClass} />
        </div>
        <div className="m-alert__text">
          {text}
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  /**
   * Message
   */
  text: PropTypes.string,

  /**
   * Icon
   */
  iconClass: PropTypes.string,

  /**
   * Alert's type
   */
  type: PropTypes.string
};

Alert.defaultProps = {
  text: '',
  iconClass: '',
  type: 'danger'
};

export default Alert;
