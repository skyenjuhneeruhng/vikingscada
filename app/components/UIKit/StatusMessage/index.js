import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ type, text, onClick }) => (
  <div className={`toast toast-${type}`} aria-live="polite" role="status" onClick={onClick}>
    <div className="toast-message">
      {text}
    </div>
  </div>
);

StatusMessage.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default StatusMessage;
