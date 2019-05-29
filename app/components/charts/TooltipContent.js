import React from 'react';
import PropTypes from 'prop-types';

const TooltipContent = (props) => {
  const {
    values, itemStyle, contentStyle
  } = props;

  return (
    <div
      className="recharts-default-tooltip"
      style={{
        margin: 0,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap',
        ...contentStyle
      }}
    >
      <ul
        className="recharts-tooltip-item-list"
        style={{ padding: 0, margin: 0 }}
      >
        {values.map(({ label, value }) => (
          <li
            className="recharts-tooltip-item"
            style={{
            display: 'block',
            paddingTop: 4,
            paddingBottom: 4,
            color: '#000',
            ...itemStyle
            }}
          >
            <span className="recharts-tooltip-item-name">{label}</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">
              {value}
            </span>
            <span className="recharts-tooltip-item-unit" />
          </li>
        ))}
      </ul>
    </div>
  );
};

TooltipContent.propTypes = {
  values: PropTypes.instanceOf(Array).isRequired,
  itemStyle: PropTypes.instanceOf(Object).isRequired,
  contentStyle: PropTypes.instanceOf(Object).isRequired
};

export default TooltipContent;
