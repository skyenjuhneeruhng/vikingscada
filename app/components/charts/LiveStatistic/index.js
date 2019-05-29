import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import moment from 'moment';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

import { getStatistic } from './actions';

class Chart extends Component {
  componentWillMount() {
    const {
      from, sensorId, statistic, id
    } = this.props;
    if (sensorId && from && statistic.length === 0) {
      const to = moment(from).endOf('day').toISOString();
      this.props.getStatistic(id, sensorId, from, to);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.from !== nextProps.from) {
      const {
        from, sensorId, id
      } = nextProps;
      const to = moment(from).endOf('day').toISOString();
      this.props.getStatistic(id, sensorId, from, to);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.from !== nextProps.from) || (this.props.sensorId !== nextProps.sensorId) ||
      (this.props.name !== nextProps.name) || (this.props.statistic !== nextProps.statistic);
  }

  render() {
    const { statistic } = this.props;

    return (
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={statistic.map(({ createdAt, value }) => ({
            createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
            value
          }))}
          syncId="liveId"
          margin={{
            top: 10, right: 0, left: 0, bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="35%" stopColor="#0080ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#0080ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis dataKey="createdAt" hide />
          <YAxis />
          <Area animationDuration={100} type="monotone" dataKey="value" stroke="#0080ff" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {
  name: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sensorId: PropTypes.string.isRequired,
  statistic: PropTypes.instanceOf(Array).isRequired,
  getStatistic: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    statistic: state.statistic[props.id] || []
  };
}

export default connect(mapStateToProps, { getStatistic })(Chart);
