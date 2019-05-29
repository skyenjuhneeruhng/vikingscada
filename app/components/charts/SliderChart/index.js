import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Rectangle } from 'recharts';

import { convertToPercent } from './../../../api_helper/data_handler';

import withPreloader from '../HOCS/withPreloader';

import TooltipContent from './../TooltipContent';

// const COLORS = ['#2a7efd', '#f1f2f7', '#ffa81f', '#ff0018'];

const shaderColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  const correctR = R < 1 ? 0 : R;
  const correctG = G < 1 ? 0 : G;
  const correctB = B < 1 ? 0 : B;

  let new_color = (`#${(0x1000000 + ((R < 255 ? correctR : 255) * 0x10000) + ((G < 255 ? correctG : 255) * 0x100) + (B < 255 ? correctB : 255)).toString(16).slice(1)}`);

  if (percent > 0) {
    new_color = `rgba(${R}, ${G}, ${B}, 0.2)`;
  }

  return new_color;
};

const CustomizedDot = (props) => {
  const { cx, cy, color } = props;
  const light = shaderColor(color, 20);
  const dark = shaderColor(color, -30);
  return (
    <Fragment>
      <circle cx={cx} cy={cy} r={25} fill={light} stroke="none" />
      <circle cx={cx} cy={cy} r={12} fill={dark} stroke="none" />
    </Fragment>
  );
};

CustomizedDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  color: PropTypes.number
};

CustomizedDot.defaultProps = {
  cx: 0,
  cy: 0,
  color: '#2a7efd'
};

const Shape = (props) => {
  const {
    x, y, background, fill, percent
  } = props;

  return (
    <Fragment>
      <text
        x={x + (background.width * 0.5)}
        y={y - 40}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="pie-text"
      >
        {`${percent}%`}
      </text>
      <Rectangle {...props} />
    </Fragment>
  );
};

Shape.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  background: PropTypes.instanceOf(Object).isRequired,
  percent: PropTypes.number.isRequired
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.min = 1;
    this.max = 15;
    this.state = {
      isTooltipShown: false,
      property: {
        x: 0,
        y: 0,
        width: 0
      }
    };
  }

  getFormatedData() {
    return [
      { y: +this.props.data[this.props.data.length - 1] }
    ];
  }

  toPositive(n) {
    return n < 0 ? 0 : n;
  }

  showTooltip = () => {
    const { isTooltipShown } = this.state;
    if (!isTooltipShown) {
      this.setState({
        isTooltipShown: true
      });
    }
  }

  hideTooltip = () => {
    const { isTooltipShown } = this.state;
    if (isTooltipShown) {
      this.setState({
        isTooltipShown: false
      });
    }
  }

  render() {
    const {
      rangeMin, rangeMax, normalMax, limitMax, normalColor, limitColor, dangerColor, avaliable
    } = this.props;

    let mainColor = normalColor;

    const mainData = +this.props.data[this.props.data.length - 1];

    if (mainData > limitMax) {
      mainColor = dangerColor;
    }

    if (mainData > normalMax && mainData < limitMax) {
      mainColor = limitColor;
    }

    if (!avaliable) {
      mainColor = normalColor;
    }

    const { isTooltipShown } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          barSize={8}
          width={600}
          height={300}
          data={this.getFormatedData()}
          onMouseOver={this.showTooltip}
          onFocus={this.showTooltip}
          onMouseLeave={this.hideTooltip}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <Tooltip
            wrapperStyle={{
              visibility: isTooltipShown ? 'visible' : 'hidden'
            }}
            content={<TooltipContent values={[{ label: 'value', value: mainData }]} />}
          />
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis hide type="number" domain={[+rangeMin, +rangeMax]} />
          <YAxis hide type="category" />
          <Bar
            shape={<Shape percent={convertToPercent(mainData, rangeMin, rangeMax)} />}
            isAnimationActive={false}
            dataKey="y"
            fill={mainColor}
            background={{ fill: '#f0f1f7' }}
          />
          <Line isAnimationActive={false} type="step" dataKey="y" activeDot={false} dot={<CustomizedDot color={mainColor} />} />
        </ComposedChart>
      </ResponsiveContainer>
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
