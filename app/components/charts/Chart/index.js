import React from 'react';
import * as ChartTypes from './constants';

import BarChart from './../BarChart';
import AreaChart from './../AreaChart';
import TextChart from './../TextChart';
import PieChart from './../PieChart';
import KnobChart from './../KnobChart';
import SliderChart from './../SliderChart';
import LinearChart from './../LinearChart';
import MapChart from './../MapChart';
import SwitchButton from './../SwitchButton';
import GridIntegration from './../GridIntegration';
import LiveStatistic from './../LiveStatistic';
import StackedBar from './../StackedBar';

export default (props) => {
  let component;
  switch (props.type) {
    case ChartTypes.BAR_CHART:
      component = <BarChart {...props} />;
      break;
    case ChartTypes.PIE_CHART:
      component = <PieChart {...props} />;
      break;
    case ChartTypes.TEXT_CHART:
      component = <TextChart {...props} />;
      break;
    case ChartTypes.AREA_CHART:
      component = <AreaChart {...props} />;
      break;
    case ChartTypes.KNOB_CHART:
      component = <KnobChart {...props} />;
      break;
    case ChartTypes.SLIDER_CHART:
      component = <SliderChart {...props} />;
      break;
    case ChartTypes.LINEAR_CHART:
      component = <LinearChart {...props} />;
      break;
    case ChartTypes.MAP_CHART:
      component = <MapChart {...props} />;
      break;
    case ChartTypes.SWITCH_CHART:
      component = <SwitchButton {...props} />;
      break;
    case ChartTypes.GRID_INTEGRATION_CHART:
      component = <GridIntegration {...props} />;
      break;
    case ChartTypes.LIVE_STATISTIC_CHART:
      component = <LiveStatistic {...props} />;
      break;
    case ChartTypes.STACKED_BAR_CHART:
      component = <StackedBar {...props} />;
      break;
    default:
      throw new Error('ERROR: UNKNOWN CHART');
  }

  return component;
};
