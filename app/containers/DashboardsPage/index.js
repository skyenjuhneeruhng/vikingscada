import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';


import { confirm } from '../../components/Modal/util/confirm';

import * as ChartTypes from '../../components/charts/Chart/constants';

import { listenSensor, stopListening, socket } from './../../api_helper/data_handler';

import Widget from '../../components/Widget';
import PropertySidebar from '../../components/PropertySidebar';
import Sidebar from '../../components/Sidebar';

import Alert from '../../components/Alert';
import { showAlert } from './../NotificationGenerator/alerts';

import { addWidget, addFullWidget, updateFullWidget, removeWidget, cancelWidget, updateWidget, updateLayout, lockLayout, getDashboard, cleanLayout, getWidgetById } from './actions';
import { toggleSidebar } from './../../components/Sidebar/actions';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocked: true,
      property: false,
      widgetInd: 0,
      data: {},
      sensorId: '',
      edit: false,
      isLoad: false,
      sensorBitmask: null,
      currentBreakpoint: 'lg'
    };

    this.url = props.profile && props.profile.role && props.profile.role.type === 'root' ?
      `dashboard/${props.match.params && props.match.params.dashboardId}` :
      `account/dashboard/${props.match && props.match.params && props.match.params.siteId}/${props.match && props.match.params && props.match.params.dashboardId}`;
  }

  componentDidMount() {
    this.props.getDashboard(this.url);

    // For testing purpose only !!!
    /* eslint-disable */
    // this.script = document.createElement('script');
    // this.script.onload = () => {
    //   this.stats = new Stats();
    //   document.body.appendChild(this.stats.dom);
    //   const self = this;
    //   function loop() {
    //     self.stats.update();
    //     self.update = window.requestAnimationFrame(loop);
    //   };
    //   this.update = window.requestAnimationFrame(loop);
    // };
    // this.script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    // document.head.appendChild(this.script);
    /* eslint eqeqeq:0 */
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLocked && this.props.widgets.length < nextProps.widgets.length) {
      this.setState({
        property: true,
        widgetInd: nextProps.widgets[nextProps.widgets.length - 1].i
      });
    }
  }

  componentWillUnmount() {
    const { data } = this.state;
    Object.keys(data).forEach(
      (id) => stopListening(id)
    );

    this.props.cleanLayout();

    // For testing purpose only !!!
    // if (this.update) {
    //   window.cancelAnimationFrame(this.update);
    //   document.body.removeChild(this.stats.dom);
    // }
  }

  onRemoveItem = (ind) => {
    const widget = this.props.widgets && this.props.widgets.filter((item) => (item.settings && item.settings.layouts && item.settings.layouts.lg.i === ind))[0];
    return () => {
      if (widget) {
        confirm('Are you sure, that you want to delete this widget?').then(() => {
          this.setState({ property: false });
          this.props.removeWidget(this.props.match && this.props.match.params && this.props.match.params.dashboardId, widget.id);
        }, () => { });
      } else {
        console.log('widget is undefined');
      }
    };
  }


  onSettingItem = (i, widgetID) => (e) => {
    this.props.getWidgetById(this.props && this.props.match && this.props.match.params && this.props.match.params.dashboardId, widgetID);
    e.preventDefault();
    this.setState({
      property: true,
      widgetInd: i,
      edit: true
    });
  }



  onLayoutChange = (layout, layouts) => {
    this.props.updateLayout(layouts);

    const { widgets } = this.props;

    if (widgets.length > 0) {
      const ids = widgets.reduce(
        (prev, cur) => (prev.includes(cur.sensor) ? prev : [...prev, cur.sensor]),
        []
      );

      ids.forEach((id) => id && this.subscribeToSensor(`/${id}/data`));

      widgets.forEach((widget) => {
        const { type } = widget.settings ? widget.settings.layouts && widget.settings.layouts.lg : widget;
        if (
          type !== ChartTypes.LIVE_STATISTIC_CHART && type !== ChartTypes.STACKED_BAR_CHART &&
          type !== ChartTypes.MAP_CHART && type !== ChartTypes.SWITCH_CHART
        ) {
          socket.on(
            `/${widget.id}/alert`,
            this.showAlertNotification(widget.id)
          );
        }
      });
    }
  }

  get showSidebar() {
    const { role, site_manager } = this.props.profile;
    return (role && role.type) === 'company' || (role && role.type) === 'root' || (
      (role && role.type) === 'managers' && this.props.match.params.siteId === site_manager._id
    );
  }

  subscribeToSensor(url) {
    if (!this.state.data[url]) {
      this.setState((prevState) => ({
        data: { ...prevState.data, [url]: [] }
      }));
      listenSensor(
        url,
        (data) => {
          this.setState({ data });
        }
      );
    }
  }

  showAlertNotification = (id) => (data) => {
    const msg = JSON.parse(data);
    showAlert(msg.type, {
      body: `The widget ${msg.widget_title} has reached ${msg.type} boundary!`,
      tag: id
    });
  }

  closeSidebar = (ind) => () => {
    if (ind) {
      this.props.cancelWidget();
      this.setState({
        isLoad: false
      });
    }

    this.setState({ property: false });
  }

  sensorId = (id, bitmask) => {
    this.setState({ sensorId: id, sensorBitmask: bitmask });
  }

  renderBitMask = (d, mask) => {
    const bitmask = {};
    if (mask) {
      const bitmaskArray = mask && mask.split(",");
      bitmaskArray && bitmaskArray.map((item, i) => {
        if (d[`${i}_bitmask_enabled`]) {
          bitmask[i] = d[`${i}_mask`] ? 1 : 0;
        }
      });
    }
    return bitmask;
  }

  saveProperty = (d) => {
    const { widgets } = this.props;


    if (this.state.edit) {
      const widget = widgets && widgets.filter((item) => (item.settings && item.settings.layouts && item.settings.layouts.lg.i === this.state.widgetInd))[0];
      const avaliable = typeof this.props.avaliable === 'boolean' ? this.props.avaliable : widget.alert_rule;

      console.log('avaliable', avaliable);

      d.bitmask = this.state.sensorBitmask === null ? d.bitmask : this.state.sensorBitmask;
      const layout = {
        layouts: {
          ...widget.settings && widget.settings.layouts,
          name: d.name
        },
        data: {
          ...d,
          sensor: this.state.sensorId || widget.sensor
        }
      };

      const { type } = layout.layouts;
      console.log('type', type);
      console.log('type', this.props);
      let fullData;
      if (type === ChartTypes.SWITCH_CHART && avaliable) {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          alert_bitmask: JSON.stringify(this.renderBitMask(d, d.bitmask)),
          sensor_id: this.state.sensorId || widget.sensor
        };
        console.log('1');
      } else if (
        type !== ChartTypes.LIVE_STATISTIC_CHART && type !== ChartTypes.STACKED_BAR_CHART &&
        type !== ChartTypes.MAP_CHART && avaliable
      ) {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          alert_low: 0,
          alert_normal: d.normalMax,
          alert_high: d.limitMax,
          sensor_id: this.state.sensorId || widget.sensor
        };
        console.log('2');

      } else {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          sensor_id: this.state.sensorId || widget.sensor
        };

        console.log('3');

      }

      console.log('fullData', fullData);

      this.props.updateFullWidget(fullData, this.props.match && this.props.match.params && this.props.match.params.dashboardId, widget.id);

      this.setState({ edit: false });

      const url = `/${widget.id}/data`;
      if (!this.state.data[url]) {
        this.subscribeToSensor(url);
        if (
          type !== ChartTypes.LIVE_STATISTIC_CHART && type !== ChartTypes.STACKED_BAR_CHART &&
          type !== ChartTypes.MAP_CHART && type !== ChartTypes.SWITCH_CHART
        ) {
          socket.on(
            `/${widget.id}/alert`,
            this.showAlertNotification(widget.id)
          );
        }
      }
    } else {
      d.bitmask = this.state.sensorBitmask;
      const widget = widgets && widgets[widgets.length - 1];
      const layout = {
        layouts: {
          lg: {
            ...widget,
            name: d.name,
            y: Number.MAX_SAFE_INTEGER
          }
        },
        data: {
          ...d,
          sensor: this.state.sensorId
        }
      };

      const { type } = widget;
      let fullData;
      if (type === ChartTypes.SWITCH_CHART && this.props.avaliable) {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          alert_bitmask: JSON.stringify(this.renderBitMask(d, this.state.sensorBitmask)),
          sensor_id: this.state.sensorId || widget.sensor
        };
      } else if (
        type !== ChartTypes.LIVE_STATISTIC_CHART && type !== ChartTypes.STACKED_BAR_CHART &&
        type !== ChartTypes.MAP_CHART && this.props.avaliable
      ) {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          alert_low: 0,
          alert_normal: d.normalMax,
          alert_high: d.limitMax,
          sensor_id: this.state.sensorId || '000000000000000000000000',
        };
      } else {
        fullData = {
          title: d.name,
          settings: JSON.stringify(layout),
          sensor_id: this.state.sensorId || '000000000000000000000000'
        };
      }

      this.props.addFullWidget(fullData, this.props.match && this.props.match.params && this.props.match.params.dashboardId);

      this.subscribeToSensor(`/${this.state.sensorId}/data`);
    }
    this.setState({
      property: false,
      isLoad: false
    });
  }

  lockLayout = () => {
    const { widgets } = this.props;
    this.setState({
      isLocked: true
    }, () => {
      const layouts = widgets && widgets.map((item, index) => ({
        ...item.settings ? item.settings.layouts && item.settings.layouts && item.settings.layouts.lg : item,
        isResizable: false,
        isDraggable: false
      }
      ));

      this.props.lockLayout(
        this.state.currentBreakpoint,
        true,
        this.url,
        {
          layouts: JSON.stringify({
            lg: layouts
          })
        }
      );
    });
  }

  unlockLayout = () => {
    this.setState({
      isLocked: false
    }, () => {
      this.props.lockLayout(this.state.currentBreakpoint, false);
    });
  }

  createWidget(data) {
    const d = data;
    return (
      <div
        key={data.i}
        data-grid={data}
        style={data.type === ChartTypes.TEXT_CHART && { zIndex: 3 }}
      >
        <Widget
          id={data.i}
          edit={this.onEditItem}
          remove={this.onRemoveItem(data.i)}
          settings={this.onSettingItem(data.i, data.widgetID)}
          isPropertySidebar={this.state.property && data.i === this.state.widgetInd}
          w={d.w}
          h={d.h}
          type={data.type}
          name={data.name}
          normalMax={data.normalMax}
          limitMax={data.limitMax}
          rangeMin={data.rangeMin}
          rangeMax={data.rangeMax}
          normalColor={data.normalColor}
          limitColor={data.limitColor}
          dangerColor={data.dangerColor}
          avaliable={data.avaliable}
          lat={data.lat}
          long={data.long}
          zoom={data.zoom}
          showMenu={!this.state.isLocked}
          sensorId={data.sensor}
          data={this.state.data[`/${data.sensor}/data`] || []}
          siteId={this.props.match && this.props.match.params && this.props.match.params.siteId}
          from={data.from}
          to={data.to}
          labelName={data.labelName}
        />
      </div>
    );
  }

  isLoad = () => {
    this.setState({
      isLoad: true
    });
  }

  onBreakpointChange = (br, cols) => {
    this.setState({
      currentBreakpoint: br
    })
  }

  renderNotifications = () => {
    if(('Notification' in window)) {
      return (
        Notification.permission === 'denied' && (
          <Alert
            type="warning"
            iconClass="flaticon-exclamation-1"
            text="Browser notification is denied. Please, allow notifications to be able to see widget alarms."
          />
        )
      );
    }
  }

  render() {
    const { widgets, traffic } = this.props;
    const propWidget = widgets && widgets.filter((item) => {
      if (item.settings) {
        if (item.settings.layouts && item.settings.layouts.lg.i === this.state.widgetInd) {
          return item;
        }
      } else if (item.i === this.state.widgetInd) {
        return item;
      }
      return false;
    })[0];

    const data = (propWidget && propWidget.settings) ? { ...propWidget.settings.data, type: propWidget.settings.layouts.lg && propWidget.settings.layouts.lg.type } : propWidget;
    const { role } = this.props && this.props.profile;
    // const layouts = widgets && widgets.map((item) => (item.settings ? { ...item.settings.layouts, ...item.settings.data } : item));

    const lg = widgets && widgets.map((item) => (item.settings ? { ...item.settings.layouts && item.settings.layouts.lg, ...item.settings.data, widgetID: item.id } : item));

    const layouts = {
      lg
    }



    return (
      <Fragment>
        {this.showSidebar && (
          <Sidebar
            isLocked={this.state.isLocked}
            lock={this.lockLayout}
            unlock={this.unlockLayout}
            isLoad={this.isLoad}
          />
        )}
        <div className="m-grid__item m-grid__item--fluid m-wrapper">
          {(role && role.type) === 'company' && (traffic === '"off"' || !traffic) ?
            <Alert type="danger" iconClass="flaticon-exclamation-1" text="No megabytes left. To continue streaming your data, subscribe to or purchase custom plan, please." /> : null
          }
          { 
            this.renderNotifications()
          }
        <ResponsiveReactGridLayout
            layouts={layouts}
            breakpoints={{
              lg: 768, xxs: 0
            }}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={(layout, lays) =>
              this.onLayoutChange(layout, lays)
            }
            {...this.props}
          >
            {layouts.lg && layouts.lg.map((d) => this.createWidget(d))}
          </ResponsiveReactGridLayout>
          {this.state.property && (
            <PropertySidebar
              name={data.name}
              labelName={data.labelName}
              normalMax={data.normalMax}
              limitMax={data.limitMax}
              rangeMin={data.rangeMin}
              rangeMax={data.rangeMax}
              normalColor={data.normalColor}
              limitColor={data.limitColor}
              dangerColor={data.dangerColor}
              lat={data.lat}
              long={data.long}
              zoom={data.zoom}
              bitmaskObj={data.bitmask}
              data={data}
              sensorName={data.sensorName}
              open={this.state.property}
              onSubmit={this.saveProperty}
              close={this.closeSidebar(data.i)}
              siteId={this.props.match.params.siteId}
              userRole={this.props.profile && this.props.profile.role && this.props.profile.role.type}
              type={data.type}
              alertRule={propWidget.alert_rule}
              sensorId={this.sensorId}
              from={data.from}
              to={data.to}
            />
          )}
        </div>
        {
          this.state.isLoad ?
            <Loadable
              active={this.state.isLoad}
            /> : null
        }
      </Fragment>
    );
  }
}

// <ReactGridLayout
//   onLayoutChange={this.onLayoutChange}
//   onBreakpointChange={this.onBreakpointChange}
//   layout={this.state.layout}
//   {...this.props}
// >


DashboardsPage.propTypes = {
  className: PropTypes.string,
  traffic: PropTypes.string.isRequired,
  cols: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  profile: PropTypes.instanceOf(Object),
  rowHeight: PropTypes.number,
  removeWidget: PropTypes.func.isRequired,
  addWidget: PropTypes.func.isRequired,
  widgets: PropTypes.instanceOf(Object),
  toggleSidebar: PropTypes.func.isRequired,
  updateLayout: PropTypes.func.isRequired,
  updateWidget: PropTypes.func.isRequired,
  cleanLayout: PropTypes.func.isRequired,
  getDashboard: PropTypes.func.isRequired,
  lockLayout: PropTypes.func.isRequired,
  updateFullWidget: PropTypes.func.isRequired,
  addFullWidget: PropTypes.func.isRequired,
  cancelWidget: PropTypes.func.isRequired
};

DashboardsPage.defaultProps = {
  className: 'layout',
  cols: {
    lg: 12, xxs: 1
  },
  rowHeight: 100,
  profile: {},
  widgets: [],
  match: {}
};

function mapStateToProps(state) {
  return {
    widgets: state.widgets,
    traffic: state.traffic,
    avaliable: state.entities && state.entities.avaliable
  };
}

export default connect(mapStateToProps, {
  addWidget, removeWidget, cancelWidget, toggleSidebar, updateWidget, updateLayout, lockLayout, getDashboard, cleanLayout, addFullWidget, updateFullWidget, getWidgetById
})(DashboardsPage);
