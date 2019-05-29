import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Field, reduxForm, reset } from 'redux-form';

import { required } from '../../containers/validation';
import { RenderInput } from './../../components/FormRenderers';

import Button from '../UIKit/Button';

import LiveData from './LiveData';
import SwitchSidebar from './SwitchSidebar';
import LiveStatisticSidebar from './Statistic/LiveStatistic';
import StackedBarSidebar from './Statistic/StackedBar';
import GridIntegration from './GridIntegration';
import MapSidebar from './MapChart';


import * as ChartTypes from './../charts/Chart/constants';

/**
 * Property Sidebar
 */
export class PropertySidebar extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      name: this.props.name || '',
      sensor: this.props.sensor || '',
      sensorName: this.props.sensorName || '',
      colors: this.props.colors,
      max: this.props.max,
      range: this.props.range,
      from: now,
      to: now,
      gateway: {},
      bitmask: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { type } = this.props;
    const saveName = this.props.formTmp && this.props.formTmp.SensorProperty && this.props.formTmp.SensorProperty.values && this.props.formTmp.SensorProperty.values.name;

    if (type === ChartTypes.SWITCH_CHART && this.state.bitmask !== nextState.bitmask) {
      const {
        initialize
      } = this.props;
      initialize({ name: saveName });
    }
  }

  /**
   * Change name
   *
   * @param {event} e
   * @public
   */
  onChange = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    });
  }

  onChangeColor = (colors) => {
    this.setState({
      colors
    });
  }

  onChangeValue = (max) => {
    this.setState({
      max
    });
  }

  onChangeRange = (range) => {
    this.setState({
      range
    });
  }

  getSensorId = (sensor) => {
    this.setState({
      bitmask: sensor.bitmask,
      sensor: sensor.id,
      sensorName: sensor.name
    });
    this.props.sensorId(sensor.id, sensor.bitmask);
  }

  /**
   * Close sidebar
   *
   * @param {event} e
   * @public
   */
  closeSidebar = (e) => {
    e.preventDefault();
    this.props.close();
  }

  updatePeriod = (type) => (date) => {
    this.setState({
      [type]: date
    });
  }

  isAvaliable = () => {
    const { alertRule } = this.props;
    if (alertRule && alertRule.id) {
      return true;
    }
    return typeof this.props.avaliable === 'boolean' ? this.props.avaliable : (this.props.data && this.props.data.avaliable);
  }

  renderPropertiesByType() {
    const { type, userRole } = this.props;
    const url = userRole === 'root' ? `sensor?site=${this.props.siteId}` : `account/sensor/${this.props.siteId}`;
    switch (type) {
      case ChartTypes.GRID_INTEGRATION_CHART:
        return (
          <GridIntegration
            url={url}
            sensorName={this.state.sensorName}
            getSensorId={this.getSensorId}
            avaliable={this.isAvaliable()}
          />
        );
      case ChartTypes.SWITCH_CHART:
        return (
          <SwitchSidebar
            url={url}
            sensorName={this.state.sensorName}
            bitmaskNew={(this.state.bitmask === null) ? this.props.bitmaskObj : this.state.bitmask}
            getSensorId={this.getSensorId}
            avaliable={this.isAvaliable()}
          />
        );

      case ChartTypes.MAP_CHART:
        return (
          <MapSidebar url={url} sensorName={this.state.sensorName} getSensorId={this.getSensorId} />
        );
      case ChartTypes.LIVE_STATISTIC_CHART: {
        const { from, to } = this.state;
        return (
          <LiveStatisticSidebar
            url={url}
            sensorName={this.state.sensorName}
            getSensorId={this.getSensorId}
            from={from}
            to={to}
            updatePeriod={this.updatePeriod}
          />
        );
      }
      case ChartTypes.STACKED_BAR_CHART: {
        const { from, to } = this.state;
        return (
          <StackedBarSidebar
            url={url}
            sensorName={this.state.sensorName}
            getSensorId={this.getSensorId}
            from={from}
            to={to}
            updatePeriod={this.updatePeriod}
          />
        );
      }
      default:
        return (
          <LiveData
            url={url}
            sensorName={this.state.sensorName}
            getSensorId={this.getSensorId}
            avaliable={this.isAvaliable()}
          />
        );
    }
  }

  render() {
    const {
      name, open, handleSubmit
    } = this.props;


    console.log('render!');

    return this.props.open ? (
      <Fragment>
        <div id="m_quick_sidebar" className={`m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ${open ? 'm-quick-sidebar--on' : ''}`}>
          <div className="widget-title">
            <header className="widget-title-header">{name || 'Widget name'}</header>
            <a href="/" id="m_quick_sidebar_close" className="m-quick-sidebar__close" onClick={this.closeSidebar}>
              <i className="la la-close" />
            </a>
          </div>
          <div className="m-quick-sidebar__content">
            <form className="content m-form" onSubmit={handleSubmit}>
              <Field
                component={RenderInput}
                type="text"
                name="name"
                labelText="Name:"
                className="secondary"
                id="name"
                placeholder="Widget name"
                validate={[required]}
              />
              {this.renderPropertiesByType()}
              <footer>
                <Button
                  label="Apply"
                  type="submit"
                  id="sidebar_submit"
                  className="primary"
                  // disabled={pristine || submitting}
                />
                <Button label="Cancel" className="secondary" handleClick={this.closeSidebar} />
              </footer>
            </form>
          </div>

        </div>
      </Fragment>
    ) : null;
  }
}

PropertySidebar.propTypes = {
  /**
   * Widget's name
   */
  name: PropTypes.string,
  type: PropTypes.string,
  sensorName: PropTypes.string,
  sensor: PropTypes.string,
  userRole: PropTypes.string,
  alertRule: PropTypes.string,
  /**
   * Widget's name
   */
  siteId: PropTypes.string.isRequired,
  /**
   * Indicates if the sidebar is shown or not
   */
  open: PropTypes.bool,
  // pristine: PropTypes.bool,
  // submitting: PropTypes.bool,

  /**
   * Call to close the sidebar
   */
  close: PropTypes.func,
  sensorId: PropTypes.func,

  /**
   * Call to close the sidebar with promise resolved
   */
  initialize: PropTypes.func,
  handleSubmit: PropTypes.func,
  colors: PropTypes.instanceOf(Array),
  max: PropTypes.instanceOf(Object),
  range: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Object),
  formTmp: PropTypes.instanceOf(Object),
  bitmaskObj: PropTypes.string,
  avaliable: PropTypes.bool
};

PropertySidebar.defaultProps = {
  name: '',
  type: '',
  sensorName: '',
  sensor: '',
  userRole: '',
  alertRule: '',
  open: false,
  colors: ['#2a7efd', '#f1f2f7', '#ffa81f', '#ff0018'],
  close() {},
  handleSubmit() {},
  sensorId() {},
  initialize() {},
  max: {
    normalMax: 80,
    limitMax: 90
  },
  range: {
    rangeMin: 0,
    rangeMax: 100
  },
  data: {},
  formTmp: {},
  bitmaskObj: '',
  avaliable: null
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('SensorProperty'));

const form = reduxForm({
  form: 'SensorProperty',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitFail: (errors) => {
    if (errors) {
      const errorEl = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (errorEl && errorEl.focus) {
        errorEl.focus();
      }
    }
  },
  onSubmitSuccess: afterSubmit
})(PropertySidebar);

function mapStateToProps(state, props) {
  let sensorName = 'Widget name';
  switch (props && props.type) {
    case 'AREA_CHART': sensorName = 'Area'; break;
    case 'BAR_CHART': sensorName = 'Bar'; break;
    case 'TEXT_CHART': sensorName = 'Text'; break;
    case 'KNOB_CHART': sensorName = 'Knob'; break;
    case 'SLIDER_CHART': sensorName = 'Slider'; break;
    case 'LINEAR_CHART': sensorName = 'Linear'; break;
    case 'MAP_CHART': sensorName = 'Map'; break;
    default:
      sensorName = 'Widget name'; break;
  }

  const renderBitMask = (d, mask) => {
    const bitmask = {};
    if (mask) {
      const bitmaskArray = mask && mask.split(',');
      bitmaskArray && bitmaskArray.map((item, i) => {
        bitmask[`${i}_mask`] = d[`${i}_mask`];
        bitmask[`${i}_bitmask_enabled`] = d[`${i}_bitmask_enabled`];
      });
    }
    return bitmask;
  };

  const maskFilds = renderBitMask(props.data, props.bitmaskObj);


  const values = {
    ...maskFilds,
    normalMax: props.alertRule && props.alertRule.normal,
    limitMax: props.alertRule && props.alertRule.danger,
    rangeMax: props.rangeMax ? props.rangeMax : 100,
    rangeMin: props.rangeMin ? props.rangeMin : '0',
    name: props.name || sensorName,
    sensorName: props.sensorName || '',
    normalColor: props.normalColor ? props.normalColor : '#2a7efd',
    limitColor: props.limitColor ? props.limitColor : '#ffa81f',
    dangerColor: props.dangerColor ? props.dangerColor : '#ff0018',
    from: props.from,
    to: props.to,
    labelName: props.labelName,
    lat: props.lat || '',
    long: props.long || '',
    zoom: props.zoom || 3,
    bitmask: props.bitmaskObj || ''
  };

  console.log('values', values);
  return {
    initialValues: values,
    avaliable: state.entities && state.entities.avaliable,
    formTmp: { ...state.form }
  };
}
export default connect(mapStateToProps)(form);
