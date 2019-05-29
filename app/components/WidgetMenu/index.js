import React from 'react';
import PropTypes from 'prop-types';

/**
 * Widget Menu
 */
const WidgetMenu = function({ remove, settings }) {
  return (
    <div className="m-portlet__head-tools">
      <a onMouseDown={settings} className="m-nav__item m-nav__link" role="button">
        <i className="m-nav__link-icon flaticon-settings" />
      </a>

      <a onMouseDown={remove} className="m-nav__item m-nav__link" role="button">
        <i className="m-nav__link-icon flaticon-delete-1" />
      </a>
    </div>
  );
};

WidgetMenu.propTypes = {
  /**
   * Call to remove widget
   */
  remove: PropTypes.func.isRequired,

  /**
   * Call to open property sidebar
   */
  settings: PropTypes.func.isRequired
};

export default WidgetMenu;
