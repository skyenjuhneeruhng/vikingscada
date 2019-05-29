import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../UIKit/Input';


/**
 * Range
 */
export class Range extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min,
      max: props.max
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      [`${e.target.name}`]: +value
    }, () => this.props.changeRange(this.state));
  }

  render() {
    return (
      <div className="range-wrp">
        <span>Range:</span>
        <div className="range-inpts">
          <Input onChange={this.onChange} type="number" name="min" labelText="" className="secondary" value={this.state.min} id="rangeFrom" />
          <Input onChange={this.onChange} type="number" name="max" labelText="" className="secondary" value={this.state.max} id="rangeTo" />
        </div>
      </div>
    );
  }
}

Range.propTypes = {
  /**
   * Min value for range
   */
  min: PropTypes.number,
  /**
   * Max value forrange
   */
  max: PropTypes.number,
  changeRange: PropTypes.func
};

Range.defaultProps = {
  min: 0,
  max: 100,
  changeRange: () => {}
};

export default Range;
