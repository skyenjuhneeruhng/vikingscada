import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

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
        <BarChart
          width={600}
          height={300}
          data={convertToPosValue(data)}
          margin={{
            top: 5, right: 0, left: 0, bottom: 0
          }}
        >
          {receiveSomeData && <Tooltip />}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pos" />
          <YAxis domain={[+rangeMin, +rangeMax]} />
          {/* <Legend /> */}
          <Bar dataKey="value" fill={normalColor} />
        </BarChart>
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
