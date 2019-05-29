import React from 'react';
import PropTypes from 'prop-types';

const TopPanel = (props) => {
  const { showModal } = props;
  return (
    <div className="col-md-4 order-1 order-md-2 m--align-right">
      <a
        role="button"
        onClick={() => showModal()}
        className="btn m-btn m-btn--custom m-btn--icon btn-outline-warning m-btn--pill"
      >
        <span>
          <i className="la la-plus" />
          <span>
            Add Plan
          </span>
        </span>
      </a>
      <div className="m-separator m-separator--dashed d-md-none" />
    </div>
  );
};

TopPanel.propTypes = {
  showModal: PropTypes.func.isRequired
};

export default TopPanel;
