import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Rectangle } from 'recharts';
import { connect } from 'react-redux';

import moment from 'moment';

import TooltipContent from './../TooltipContent';

import { getStatistic, clearStatistic } from './actions';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipShown: false,
      tooltipValues: []
    };
  }

  componentWillMount() {
    const {
      from, sensorId, barStatistic, to
    } = this.props;
    if (sensorId && from && to && barStatistic.length === 0) {
      this.fetchNewData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.from !== nextProps.from || this.props.to !== nextProps.to) {
      this.fetchNewData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.to !== nextProps.to) || (this.props.from !== nextProps.from) ||
      (this.props.sensorId !== nextProps.sensorId) || (this.props.name !== nextProps.name) ||
      (this.props.barStatistic !== nextProps.barStatistic) || (this.state.isTooltipShown !== nextState.isTooltipShown) ||
      (this.state.tooltipValues !== nextState.tooltipValues);
  }

  genMonthsInRange(from, to) {
    const [startYear, startMonth] = moment(from).format('YYYY-MM').split('-');
    const [endYear, endMonth] = moment(to).format('YYYY-MM').split('-');

    const dates = [];
    for (let y = +startYear; y <= +endYear; y += 1) {
      const startM = y === +startYear ? +startMonth : 1;
      const endM = +endMonth < +startMonth && y !== +endYear ? 12 : +endMonth;
      for (let m = startM; m <= endM; m += 1) {
        dates.push(`${y}-${m}-01`);
      }
    }
    return dates;
  }

  fetchNewData(props) {
    const {
      sensorId, from, to, id
    } = props;

    this.props.clearStatistic(id);

    const dates = this.genMonthsInRange(from, to);
    this.props.getStatistic(id, sensorId, dates.join(','));
  }

  formMonth() {
    const response = this.props.barStatistic;

    const res = [];
    const resLen = response.length;
    for (let w = 0; w < 5; w += 1) {
      res.push({
        w: response.slice(7 * w, 7 * (w + 1) < resLen ? 7 * (w + 1) : resLen),
        [`w${w}`]: 1
      });
    }
    return res;
  }

  drawBars(data) {
    const bars = [];
    data.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      }
      return 0;
    }).forEach((el) => {
      el.data.forEach((item) => {
        let color;
        if (item === 0) {
          color = this.props.normalColor;
        } else if (item === 1) {
          color = this.props.limitColor;
        } else if (item === 2) {
          color = this.props.dangerColor;
        }
        bars.push(<Bar maxBarSize={30} dataKey="value" stackId={el.date} fill={color} />);
      });
    });
    return bars;
  }

  showTooltip = (values) => () => {
    const { isTooltipShown } = this.state;
    if (!isTooltipShown || this.state.tooltipValues !== values) {
      this.setState({
        isTooltipShown: true,
        tooltipValues: values
      });
    }
  }

  hideTooltip = () => {
    const { isTooltipShown } = this.state;
    if (isTooltipShown) {
      this.setState({
        isTooltipShown: false,
        tooltipValues: []
      });
    }
  }

  renderMonth = (props) => {
    const {
      x, y, width, height, data, date
    } = props;
    const { normalColor, limitColor, dangerColor } = this.props;
    return data.map((alert, i) => {
      let color;
      let alertLevel;
      if (alert === 0) {
        color = normalColor;
        alertLevel = 'normal';
      } else if (alert === 1) {
        color = limitColor;
        alertLevel = 'limit';
      } else if (alert === 2) {
        color = dangerColor;
        alertLevel = 'danger';
      }
      const tooltipValues = [
        { label: 'date', value: `${date}-${i + 1}` },
        { label: 'alert level', value: alertLevel }
      ];
      const showTooltip = this.showTooltip(tooltipValues);
      return (
        <Rectangle
          x={x + (i * width)}
          y={y}
          width={width - 1}
          height={height}
          fill={color}
          onMouseOver={showTooltip}
          onFocus={showTooltip}
        />
      );
    });
  }

  render() {
    const {
      barStatistic
    } = this.props;
    const { isTooltipShown, tooltipValues } = this.state;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={31}
          height={5}
          data={barStatistic.map((data) => ({
            ...data, date: data.date.slice(0, -3)
          }))}
          layout="vertical"
          barCategoryGap={2}
          margin={{
            top: 5, right: 5, left: 0, bottom: 5
          }}
          onMouseLeave={this.hideTooltip}
        >
          <Tooltip
            wrapperStyle={{
              visibility: isTooltipShown ? 'visible' : 'hidden'
            }}
            content={<TooltipContent values={tooltipValues} />}
          />
          <XAxis type="number" domain={[0, 31]} />
          <YAxis type="category" dataKey="date" />
          <Bar
            maxBarSize={30}
            dataKey="value"
            stackId="a"
            fill={this.props.normalColor}
            shape={this.renderMonth}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  sensorId: PropTypes.string.isRequired,
  barStatistic: PropTypes.instanceOf(Array).isRequired,
  getStatistic: PropTypes.func.isRequired,
  clearStatistic: PropTypes.func.isRequired,
  normalColor: PropTypes.string.isRequired,
  limitColor: PropTypes.string.isRequired,
  dangerColor: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  return {
    barStatistic: state.barStatistic[props.id] || []
  };
}

export default connect(mapStateToProps, { getStatistic, clearStatistic })(Chart);
