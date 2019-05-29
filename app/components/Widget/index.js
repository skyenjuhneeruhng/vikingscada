import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import WidgetMenu from './../WidgetMenu';

import Chart from './../charts/Chart';

/**
 * Widget
 */
export class Widget extends React.Component {
  render() {
    const {
      name, edit, remove, settings, isPropertySidebar, showMenu
    } = this.props;

    return (
      <Fragment>
        <div className={`m-portlet m-portlet--mobile m-portlet-widget ${isPropertySidebar && 'react-grid-item-highlight'}`}>
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <h3 className="m-portlet__head-text">
                  {name}
                </h3>
              </div>
            </div>
            {
              showMenu && (
                <WidgetMenu
                  edit={edit}
                  remove={remove}
                  settings={settings}
                />
              )
            }
          </div>
          <div className="m-portlet__body">
            <Chart {...this.props} />
          </div>
        </div>
      </Fragment>
    );
  }
}

Widget.propTypes = {
  /**
   * Widget name
   */
  name: PropTypes.string,

  /**
   *
   */
  isPropertySidebar: PropTypes.bool,

  showMenu: PropTypes.bool,

  /**
   * Call to edit widget's position
   */
  edit: PropTypes.func.isRequired,

  /**
   * Call to remove widget
   */
  remove: PropTypes.func.isRequired,

  /**
   * Call to open property sidebar
   */
  settings: PropTypes.func.isRequired
};

Widget.defaultProps = {
  name: 'Widget Name',
  showMenu: true,
  isPropertySidebar: false
};

export default Widget;
