import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

import withPreloader from '../HOCS/withPreloader';

import { convertToPosValue } from './../../../api_helper/data_handler';

class Chart extends Component {
  render() {
    const {
      rangeMin, rangeMax, normalColor, data
    } = this.props;
    const receiveSomeData = data.length > 0;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={convertToPosValue(data)}
          syncId="anyId"
          margin={{
            top: 10, right: 0, left: 0, bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={normalColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={normalColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {receiveSomeData && <Tooltip />}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pos" />
          <YAxis domain={[+rangeMin, +rangeMax]} />
          <Area
            animationDuration={100}
            type="monotone"
            dataKey="value"
            stroke={normalColor}
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  normalColor: PropTypes.string.isRequired
};

export default withPreloader(Chart);
