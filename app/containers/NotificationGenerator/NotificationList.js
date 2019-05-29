import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteNotification } from './actions';
import Notification from './Notification';

const NotificationList = (props) => {
  const messages = props.messages.map((message) => (
    <Notification key={message.id} message={message} deleteNotification={props.deleteNotification} />
  ));
  return (
    <div id="toast-container" className="toast-bottom-right">
      {messages}
    </div>
  );
};

NotificationList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNotification: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.notifiactions
  };
}

export default connect(mapStateToProps, {
  deleteNotification
})(NotificationList);
