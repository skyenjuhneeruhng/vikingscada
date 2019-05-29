import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';

import { convertToPercent } from './../../../api_helper/data_handler';

const COLORS = ['#2a7efd', '#f1f2f7', '#ffa81f', '#ff0018'];

const renderActiveShape = (colors, data) => {
  const activeShapes = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload
    } = props;

    let color = (colors && colors[0]) || '#2a7efd';

    if ((data && data[0] && data[0].value >= 84) && (data && data[0] && data[0].value <= 94)) {
      color = colors && colors[2];
    } else if (data && data[0] && data[0].value > 94) {
      color = colors && colors[3];
    }

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="pie-text">{`${~~payload.value}%`}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 8}
          outerRadius={innerRadius - 4}
          fill={color}
        />
      </g>
    );
  };

  activeShapes.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    payload: PropTypes.instanceOf(Object).isRequired
  };

  return activeShapes;
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{ name: 'Normal', value: 0 }, { name: 'Other', value: 84 }, { name: 'Limit', value: 10 }, { name: 'Danger', value: 6 }],
      activeIndex: 0
    };
  }

  getFormatedData() {
    const { range = { min: 0, max: 100 } } = this.props;
    const limitV = 10;
    const dangerV = 6;
    const limDan = limitV + dangerV;

    const value = convertToPercent(+this.props.data[this.props.data.length - 1], range.min, range.max);
    const normal = this.toPositive(100 - limDan - value);
    const limit = this.toPositive(100 - value - normal - dangerV);
    const danger = this.toPositive(100 - value - normal - limit);
    return [
      { name: 'Normal', value },
      { name: 'Other', value: normal },
      { name: 'Limit', value: limit },
      { name: 'Danger', value: danger }
    ];
  }

  toPositive(n) {
    return n < 0 ? 0 : n;
  }

  render() {
    const colors = (this.props && this.props.colors) || COLORS;
    return (
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            animationDuration={0}
            animationDelay={0}
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape(colors, this.getFormatedData())}
            data={this.getFormatedData()}
            innerRadius="54%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            startAngle={270}
            endAngle={-90}
            labelLine={false}
            dataKey="value"
          >
            {
              this.state.data.map((entry, index) => (
                <Cell key={colors[index]} fill={colors[index % colors.length]} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  range: PropTypes.instanceOf(Object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Chart;
