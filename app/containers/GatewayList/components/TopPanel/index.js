import React from 'react';
import PropTypes from 'prop-types';

const TopPanel = (props) => {
  const { role, showModal } = props;
  return role && (
    <div className="col-md-4 order-1 order-md-2 m--align-right">
      <a
        role="button"
        onClick={() => showModal()}
        className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
      >
        <span>
          <i className="la la-plus" />
          <span>
            Add Gateway
          </span>
        </span>
      </a>
      <div className="m-separator m-separator--dashed d-md-none" />
    </div>
  );
};

TopPanel.propTypes = {
  role: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired
};

export default TopPanel;
