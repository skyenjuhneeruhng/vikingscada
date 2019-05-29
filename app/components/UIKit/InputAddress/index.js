import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

export class InputAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressValue: this.props.addressVal || '',
      stateValue: this.props.stateVal || '',
      zipValue: this.props.zipVal || ''
    };
  }
  render() {
    return (
      <div className="form-group m-form__group row">
        <label className="col-form-label col-sm-3" htmlFor="address">
        * Address / State / ZIP Code
        </label>
        <div className="col-sm-3">
          <Input
            type="text"
            name="address"
            className="secondary"
            value={this.state.addressVal}
            id="address"
            placeholder="Enter address"
            onChange={this.onChange}
          />
          <span className="m-form__help">
            Address
          </span>
        </div>
        <div className="col-sm-3">
          <Input
            type="text"
            name="state"
            className="secondary"
            value={this.state.stateVal}
            placeholder="Enter state"
            onChange={this.onChange}
            id="state"
          />
          <span className="m-form__help">
           State
          </span>
        </div>
        <div className="col-sm-3">
          <Input
            type="text"
            name="zip"
            className="secondary"
            value={this.state.zipVal}
            placeholder="Enter code"
            onChange={this.onChange}
            id="zip"
          />
          <span className="m-form__help">
            ZIP Code
          </span>
        </div>
      </div>
    );
  }
}
InputAddress.propTypes = {
  addressVal: PropTypes.string,
  stateVal: PropTypes.string,
  zipVal: PropTypes.string
};
InputAddress.defaultProps = {
  addressVal: '',
  stateVal: '',
  zipVal: ''
};

export default InputAddress;
