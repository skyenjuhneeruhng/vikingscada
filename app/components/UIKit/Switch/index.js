import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Switch extends Component {
  onToggle = () => {
    const { onToggle, switchedOn } = this.props;
    onToggle(!switchedOn);
  }

  render() {
    const { className, switchedOn, name } = this.props;

    return (
      <label className={`switch ${className}`}>
        <input
          name={name}
          type="checkbox"
          checked={switchedOn}
          onClick={this.onToggle}
        />
        <span className="slider round" />
      </label>
    );
  }
}

Switch.propTypes = {
  switchedOn: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  onToggle: PropTypes.func
};

Switch.defaultProps = {
  switchedOn: false,
  className: '',
  name: '',
  onToggle: () => {}
};

export default Switch;
