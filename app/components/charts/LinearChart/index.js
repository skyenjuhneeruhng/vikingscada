import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import withPreloader from '../HOCS/withPreloader';

import CustomizedLegend from './components/CustomizedLegend';

// import { convertToPercent } from './../../../api_helper/data_handler';

const COLORS = ['#2a7efd', '#f1f2f7', '#ffa81f', '#ff0018'];

const CustomizedDot = (props) => {
  const { cx, cy } = props;
  return (
    <svg x={cx + 3} y={cy - 5} width={60} height={40} fill="#000" viewBox="0 0 1024 1024">
      <path d="M222.979,5.424C219.364,1.807,215.08,0,210.132,0c-4.949,0-9.233,1.807-12.848,5.424L69.378,133.331c-3.615,3.617-5.424,7.898-5.424,12.847c0,4.949,1.809,9.233,5.424,12.847l127.906,127.907c3.614,3.617,7.898,5.428,12.848,5.428c4.948,0,9.232-1.811,12.847-5.428c3.617-3.614,5.427-7.898,5.427-12.847V18.271C228.405,13.322,226.596,9.042,222.979,5.424z" />
    </svg>
  );
};

CustomizedDot.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired
};


CustomizedLegend.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  bcg: PropTypes.string.isRequired,
  background: PropTypes.number.isRequired,
  displayed: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        normal: 75,
        limit: 15,
        danger: 10,
        real: 70,
        normalReal: 0,
        limitReal: 0,
        dangerReal: 0
      }],
      activeIndex: 0
    };
  }

  toPositive(n) {
    return n < 0 ? 0 : n;
  }

  render() {
    const {
      rangeMin, rangeMax, normalMax = 10, limitMax, normalColor, data, avaliable
    } = this.props;

    let {
      limitColor, dangerColor
    } = this.props;

    const mainData = +data[data.length - 1];

    if (!avaliable) {
      limitColor = normalColor;
      dangerColor = normalColor;
    }

    let limit = 0;
    let danger = 0;

    if (mainData > limitMax) {
      danger = mainData - limitMax;
      limit = limitMax - normalMax;
    }

    if (mainData > normalMax && mainData < limitMax) {
      limit = mainData - normalMax;
    }

    const formatedData = [{
      normal: +normalMax,
      limit: limitMax - normalMax,
      danger: rangeMax - limitMax,
      real: mainData,
      normalReal: mainData > normalMax ? normalMax : mainData,
      limitReal: limit,
      dangerReal: danger
    }];

    return (
      <Fragment>
        <ResponsiveContainer width="35%" height="100%">
          <ComposedChart
            data={formatedData}
            margin={{
              top: 10, right: 0, left: 0, bottom: 10
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis hide />
            <YAxis domain={[+rangeMin, +rangeMax]} />
            <Bar dataKey="normal" stackId="a" fill={normalColor} barSize={18} />
            <Bar dataKey="limit" stackId="a" fill={limitColor} />
            <Bar dataKey="danger" stackId="a" fill={dangerColor} />
            <Line type="monotone" dataKey="real" dot={<CustomizedDot />} />

          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="50%" height="100%">
          <ComposedChart
            data={formatedData}
            barGap={1}
            margin={{
              top: 10, right: 0, left: 0, bottom: 10
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis hide />
            <YAxis hide domain={[+rangeMin, +rangeMax]} />
            <Bar
              isAnimationActive={false}
              dataKey="normalReal"
              stackId="a"
              shape={<CustomizedLegend bcg={normalColor} displayed count={1} data={formatedData} />}
              background={{ fill: '#F5F5F5', stroke: '#677a8f', strokeWidth: '5' }}
            />
            <Bar
              isAnimationActive={false}
              dataKey="limitReal"
              stackId="a"
              shape={<CustomizedLegend bcg={limitColor} count={2} data={formatedData} />}
            />
            <Bar
              isAnimationActive={false}
              dataKey="dangerReal"
              stackId="a"
              shape={<CustomizedLegend bcg={dangerColor} count={3} data={formatedData} />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.instanceOf(Object),
  rangeMin: PropTypes.number,
  rangeMax: PropTypes.number,
  normalMax: PropTypes.number,
  limitMax: PropTypes.number,
  normalColor: PropTypes.string,
  limitColor: PropTypes.string,
  dangerColor: PropTypes.string,
  avaliable: PropTypes.bool
};

Chart.defaultProps = {
  colors: COLORS,
  data: [70],
  rangeMin: 0,
  rangeMax: 100,
  normalMax: 80,
  limitMax: 90,
  normalColor: '#000',
  limitColor: '#000',
  dangerColor: '#000',
  avaliable: true
};

export default withPreloader(Chart);
