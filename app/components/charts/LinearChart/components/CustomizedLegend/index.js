import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class CustomizedLegend extends Component {
  renderNewProperty = () => {
    const {
      y, height, count, data
    } = this.props;

    const newProperty = {};
    switch (count) {
      case 1: newProperty.y = y; newProperty.height = height > 4 ? height - 4 : height; break;
      case 2: newProperty.y = y; newProperty.height = height; break;
      case 3: newProperty.y = data[0].dangerReal > 0 ? y + 4 : y; newProperty.height = data[0].dangerReal > 0 ? height - 4 : height; break;
      default:
        newProperty.y = y; newProperty.height = height > 4 ? height - 4 : height; break;
    }
    return newProperty;
  }

  renderDrop() {
    const { background, data } = this.props;
    const center = {
      x: background.x + (background.width * 0.5),
      y: background.y + (background.height * 0.5)
    };
    const dropRadius = Math.min(
      background.width * 0.2,
      background.height * 0.25
    );
    const triangleShiftCoef = 0.5;
    const trianglePoints = [
      `${center.x - (dropRadius * 0.87)},${center.y - (dropRadius * triangleShiftCoef)}`,
      `${center.x + (dropRadius * 0.87)},${center.y - (dropRadius * triangleShiftCoef)}`,
      `${center.x},${center.y - (dropRadius * (1.2 + triangleShiftCoef))}`
    ];

    const value = `${data[0].real}`;
    const fontSize = 2 * dropRadius / value.length;

    return (
      <Fragment>
        <circle
          cx={center.x}
          cy={center.y}
          r={dropRadius}
          fill="#fff"
          stroke="none"
        />
        <polygon points={trianglePoints.join(' ')} fill="#fff" />
        <text
          x={center.x}
          y={center.y}
          dy={fontSize * 0.4}
          textAnchor="middle"
          className="pie-text"
          style={{
            fontWeight: 'bold',
            fontSize: `${fontSize}px`
          }}
        >
          {value}
        </text>
      </Fragment>
    );
  }

  render() {
    const {
      x, width, background, bcg, displayed
    } = this.props;
    const half = background.height / 2;
    const startHalf = half / 2;
    const endHalf = half + (half / 2);

    const newProperty = this.renderNewProperty();

    return (
      <Fragment>
        {displayed ?
          <g id="barrel">
            <circle cx={background.x - 3} cy={background.y + 2} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x - 3} cy={background.y + background.height - half} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x - 3} cy={background.y + background.height - startHalf} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x - 3} cy={background.y + background.height - endHalf} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x - 3} cy={background.y + background.height - 3} r={5} fill="#677a8f" stroke="none" />

            <circle cx={background.x + background.width + 3} cy={background.y + 3} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x + background.width + 3} cy={background.y + background.height - half} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x + background.width + 3} cy={background.y + background.height - startHalf} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x + background.width + 3} cy={background.y + background.height - endHalf} r={5} fill="#677a8f" stroke="none" />
            <circle cx={background.x + background.width + 3} cy={background.y + background.height - 3} r={5} fill="#677a8f" stroke="none" />

            <path d={`M ${background.x}, ${background.y - 2} Q ${(background.width / 2) + 20}, -4 ${background.x + background.width}, ${background.y - 2}`} fill="#677a8f" stroke="none" />
            <path d={`M ${background.x}, ${background.y + 2 + background.height} Q ${(background.width / 2) + 20}, ${background.y + 12 + background.height} ${background.x + background.width}, ${background.y + 2 + background.height}`} fill="#677a8f" stroke="none" />
          </g>
        : null}

        <path cursor="pointer" radius="0" fill={bcg} stroke="none" strokeWidth="2" d={`M ${x + 4}, ${newProperty.y} h ${width - 8} v ${newProperty.height} h ${-width + 8} Z`} />

        {this.renderDrop()}
      </Fragment>
    );
  }
}

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


export default CustomizedLegend;
