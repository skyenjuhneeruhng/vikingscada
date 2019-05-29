import React from 'react';
import PropTypes from 'prop-types';

import PreloaderIcon from 'react-preloader-icon';
import Puff from 'react-preloader-icon/loaders/Puff';

const isNumber = (value) => !Number.isNaN(Number(value));

const defaultPreloaderProps = {
  loader: Puff,
  size: 90,
  strokeWidth: 8,
  strokeColor: '#2A7EFD',
  duration: 800,
  className: 'widget-preloader'
};

export default function withPreloader(WrappedComponent, preloaderConfig = {}, rule = isNumber) {
  const preloaderProps = {
    ...defaultPreloaderProps,
    ...preloaderConfig
  };

  const Composed = (props) => {
    const { data } = props;
    const lastValue = data[data.length - 1];

    return rule(lastValue) ? (
      <WrappedComponent {...props} />
    ) : (
      <PreloaderIcon {...preloaderProps} />
    );
  };

  Composed.propTypes = {
    data: PropTypes.instanceOf(Object)
  };

  Composed.defaultProps = {
    data: []
  };

  return Composed;
}
