import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
// import { rnd } from './../fake_data_generator';
import { convertToPercent } from './../../../api_helper/data_handler';

import withPreloader from '../HOCS/withPreloader';

import TooltipContent from './../TooltipContent';

const COLORS = ['#2a7efd', '#f1f2f7', '#ffa81f', '#ff0018'];

const renderActiveShape = (color, id) => {
  const activeShapes = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload
    } = props;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * endAngle);
    // const sins = Math.sin(-RADIAN * startAngle);
    // const sine = Math.sin(-RADIAN * -44);
    const cos = Math.cos(RADIAN * endAngle);
    // const coss = Math.cos(RADIAN * startAngle);
    // const cose = Math.cos(RADIAN * -44);
    const mx = cx + ((innerRadius + ((outerRadius - innerRadius) / 2)) * cos);
    const my = cy + ((innerRadius + ((outerRadius - innerRadius) / 2)) * sin);

    // const sx = cx + ((innerRadius + ((outerRadius - innerRadius) / 2)) * coss);
    // const sy = cy + ((innerRadius + ((outerRadius - innerRadius) / 2)) * sins);

    // const ex = cx + ((innerRadius + ((outerRadius - innerRadius) / 2)) * cose);
    // const ey = cy + ((innerRadius + ((outerRadius - innerRadius) / 2)) * sine);


    return (
      <Fragment>
        {/* <g>
          <circle cx={sx} cy={sy} r={(outerRadius - innerRadius) / 2} fill={color} stroke="none" />
          <circle cx={ex} cy={ey} r={(outerRadius - innerRadius) / 2} fill="#f0f1f7" stroke="none" />
        </g> */}
        <g id={id}>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000" className="pie-text">{`${~~payload.value}%`}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={color}
          />
          <circle cx={mx} cy={my} r={(outerRadius - innerRadius + 8) / 2} fill="#fff"stroke="#000" strokeWidth="3" />
        </g>
      </Fragment>
    );
  };

  activeShapes.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    payload: PropTypes.instanceOf(Object).isRequired
  };

  return activeShapes;
};


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: 'Normal', value: 60 }, { name: 'Other', value: 40 }],
      activeIndex: 0,
      mx: 0,
      my: 0,
      outerRadius: 0,
      innerRadius: 0,
      isTooltipShown: false
    };
  }
  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     const d = rnd(10, 100);
  //     this.setState({
  //       data: [{ name: 'Normal', value: d }, { name: 'Other', value: 100 - d }]
  //     });
  //   }, 1500);
  // }
  // compoentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  getFormatedData() {
    const {
      rangeMin, rangeMax
    } = this.props;

    const value = convertToPercent(+this.props.data[this.props.data.length - 1], rangeMin, rangeMax);
    const normal = this.toPositive(100 - value);

    return [
      { name: 'Normal', value, label: 'value' },
      { name: 'Other', value: normal, label: 'value' }
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
      normalMax, limitMax, normalColor, limitColor, dangerColor, avaliable
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

    const id = `active-shape_${shortid.generate()}`;

    const { isTooltipShown } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          onMouseOver={this.showTooltip}
          onFocus={this.showTooltip}
          onMouseLeave={this.hideTooltip}
        >
          <Tooltip
            wrapperStyle={{
              visibility: isTooltipShown ? 'visible' : 'hidden'
            }}
            content={<TooltipContent values={[{ label: 'value', value: mainData }]} />}
          />
          <Pie
            isAnimationActive={false}
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape(mainColor, id)}
            data={this.getFormatedData()}
            innerRadius="54%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            startAngle={224}
            endAngle={-44}
            labelLine={false}
            dataKey="value"
            nameKey="label"
          >
            {
              this.state.data.map((entry, index) => (
                <Cell key={COLORS[index]} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <use xlinkHref={`#${id}`} />
        </PieChart>
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
