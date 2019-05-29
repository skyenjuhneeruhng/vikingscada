import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StatusMessage from '../../components/UIKit/StatusMessage';

class Notification extends Component {
  onClick = () => {
    this.props.deleteNotification(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;

    return (
      <StatusMessage type={type} text={text} onClick={this.onClick} />
    );
  }
}

Notification.propTypes = {
  message: PropTypes.instanceOf(Object).isRequired,
  deleteNotification: PropTypes.func.isRequired
};

export default Notification;
