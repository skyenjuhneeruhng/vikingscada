import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Tooltip } from 'recharts';

import TooltipContent from './../TooltipContent';

import withPreloader from '../HOCS/withPreloader';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipShown: false
    };
  }

  getFormatedData() {
    const {
      labelName, rangeMax, normalMax, limitMax, data
    } = this.props;

    const value = +data[data.length - 1];

    return [
      {
        name: labelName,
        normal: normalMax,
        limit: limitMax - normalMax,
        danger: rangeMax - limitMax,
        value: Number.isNaN(value) ? 0 : value
      }
    ];
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
      normalColor, data, rangeMin, rangeMax, avaliable
    } = this.props;

    let {
      limitColor, dangerColor
    } = this.props;

    const { isTooltipShown } = this.state;
    const mainData = +data[data.length - 1];

    if (!avaliable) {
      limitColor = normalColor;
      dangerColor = normalColor;
    }

    return (
      <ResponsiveContainer width="100%" height="75%">
        <BarChart
          width={1000}
          height={100}
          data={this.getFormatedData()}
          layout="vertical"
          margin={{
            top: 45, right: 20, left: 0, bottom: 0
          }}
          onMouseOver={this.showTooltip}
          onFocus={this.showTooltip}
          onMouseLeave={this.hideTooltip}
        >
          <CartesianGrid horizontal={false} vertical={false} />
          {mainData && <Tooltip
            wrapperStyle={{
              visibility: isTooltipShown ? 'visible' : 'hidden'
            }}
            content={<TooltipContent values={[{ label: 'value', value: mainData }]} />}
          />}
          <XAxis type="number" domain={[+rangeMin, +rangeMax]} />
          <YAxis type="category" dataKey="name" yAxisId={0} />
          <YAxis type="category" dataKey="name" yAxisId={1} hide />
          <Bar isAnimationActive={false} dataKey="normal" stackId="a" yAxisId={1} fill={normalColor} />
          <Bar isAnimationActive={false} dataKey="limit" stackId="a" yAxisId={1} fill={limitColor} />
          <Bar isAnimationActive={false} dataKey="danger" stackId="a" yAxisId={1} fill={dangerColor} />
          <Bar barSize={7} isAnimationActive={false} dataKey="value" stackId="b" yAxisId={0} fill="#ffffff" />
        </BarChart>
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
  labelName: PropTypes.string,
  normalColor: PropTypes.string,
  limitColor: PropTypes.string,
  dangerColor: PropTypes.string,
  avaliable: PropTypes.bool
};

Chart.defaultProps = {
  data: [0],
  rangeMin: 0,
  rangeMax: 100,
  normalMax: 80,
  limitMax: 90,
  labelName: '',
  normalColor: '#000',
  limitColor: '#000',
  dangerColor: '#000',
  avaliable: true
};

export default withPreloader(Chart);
