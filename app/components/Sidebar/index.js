import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Input from '../UIKit/Input';
import Select from '../UIKit/Select';

import AddButton from '../../components/UIKit/AddButton';

import * as ChartTypes from '../../components/charts/Chart/constants';

import { addWidget } from './../../containers/DashboardsPage/actions';

/**
 * Sidebar
 */
import { toggleSidebar } from './actions';

class Sidebar extends React.Component {
  // after render
  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  // after removing the component
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  /**
   * handle click outside
   *
   * @param {event} e
   * @public
   */
  handleClickOutside = (e) => {
    const sidebar = document.getElementById('m_aside_left');
    const addBtn = document.querySelector('.pluss-button');
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sidebar) && !path.includes(addBtn) && this.props.addButton) {
      if (this.props.addButton) {
        this.props.toggleSidebar(false);
      }
    }
  }

  /**
   * Toggle Sidebar
   *
   * @public
   */
  toggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    this.props.toggleSidebar(!this.props.addButton);
  }

  /**
   * Add widget
   *
   * @param {string} type
   * @public
   */
  addWidget = (type) => () => {
    this.props.isLoad();
    this.props.addWidget({
      x: 0,
      y: Infinity,
      type
    });
    this.toggle(false);
  }

  render() {
    return (
      <Fragment>
        <button className="m-aside-left-close m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
          <i className="la la-close" />
        </button>
        <div id="m_aside_left" className={`m-grid__item m-aside-left m-aside-left--skin-dark  ${this.props.addButton ? 'm-aside-left--on' : ''}`}>
          <div id="m_ver_menu" className="m-aside-menu m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark" m-menu-vertical="1" m-menu-scrollable="0" m-menu-dropdown-timeout="500">
            <Input type="text" name="searsh" value="" placeholder="Search" />
            <div className="form-group m-form__group">
              <Select type="text" name="category" value="" option={['category1', 'category1']} placeholder="Searsh" />
            </div>
            <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow">
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.AREA_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_graph.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>2D Graph</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.BAR_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_spectrum_display.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span style={{ fontSize: '0.75rem' }}>Spectrum Display</span>
              </li>
              {/* <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.PIE_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/icon-3.png" alt="" />
                </div>
                <span>Angular</span>
              </li> */}
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.TEXT_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_variable_value.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Variable Values</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.KNOB_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_knob.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Knob</span>
              </li>

              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.SLIDER_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_slider.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Slider</span>
              </li>

              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.LINEAR_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_linear.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Linear</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.MAP_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_map.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Map</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.SWITCH_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_switch.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Switch</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.GRID_INTEGRATION_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_Grid Integration.svg" alt="" />
                </div>
                <span>Grid Integration</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.LIVE_STATISTIC_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_2d_graph.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Live Statistic</span>
              </li>
              <li className="m-menu__item" aria-haspopup="true" onClick={this.addWidget(ChartTypes.STACKED_BAR_CHART)}>
                <div className="widget-wrp">
                  <img src="../img/ic_stacked bar.svg" alt="" />
                  {/*
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  */}
                </div>
                <span>Stacked Bar</span>
              </li>
              {/*
                <li
                  className="m-menu__item"
                  aria-haspopup="true"
                  onClick={this.addWidget(ChartTypes.BAR_CHART)}
                >
                  <div className="widget-wrp">
                    <img src="../img/icon-5.png" alt="" />
                    <div className="big-chart">
                      <img src="../img/chart.png" alt="" />
                    </div>
                  </div>
                  <span>LED Bar</span>
                </li>
              */}
            </ul>
          </div>
        </div>

        {
          this.props.isLocked ? (
            <AddButton
              handleClick={this.props.unlock}
              iconClass="la-thumb-tack"
            />
          ) : (
            <Fragment>
              <AddButton
                style={{ margin: '60px 0', backgroundColor: '#4BB543' }}
                handleClick={this.props.lock}
                iconClass="la-check"
              />
              <AddButton handleClick={this.toggle} className="d-none d-sm-block" />
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  /**
   * Indicates if the sidebar is shown or not
   */
  addButton: PropTypes.bool.isRequired,
  isLoad: PropTypes.bool.isRequired,

  /**
   * Call to add the widget
   */
  addWidget: PropTypes.func.isRequired,

  isLocked: PropTypes.bool.isRequired,
  lock: PropTypes.func.isRequired,
  unlock: PropTypes.func.isRequired,

  /**
   * Call to toggle the sidebar
   */
  toggleSidebar: PropTypes.func.isRequired
};

/**
 * Binding data from store, return props for component
 *
 * @param {object} state
 * @public
 */
function mapStateToProps(state) {
  return {
    addButton: state.sidebar
  };
}

export default connect(mapStateToProps, {
  addWidget, toggleSidebar
})(Sidebar);
