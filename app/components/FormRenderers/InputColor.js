import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/lib/Modal';
import { SketchPicker } from 'react-color';

export class InputColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null,
      displayColorPicker: false
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: true });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({
      color: color.hex
    });
  };

  render() {
    const {
      input,
      id,
      labelText,
      className,
      spanText,
      meta,
      ...custom
    } = this.props;

    const val = this.state.color !== null ? this.state.color : input.value;

    return (
      <Fragment>
        <div className="form-group m-form__group">
          <div className="color-block-wrp" onClick={this.handleClick} role="presentation">
            <div className="color-block" style={{ backgroundColor: val }} />
            <input
              // hidden
              readOnly
              className="form-control m-input color-input"
              id={id}
              {...input}
              {...custom}
              value={val}
            />
          </div>
        </div>
        <Modal onHide={this.handleClose} show={this.state.displayColorPicker} className="color-modal">
          <div className="color-popup" >
            <SketchPicker color={val} onChange={this.handleChange} />
          </div>
        </Modal>
      </Fragment>
    );
  }
}

InputColor.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string
};
InputColor.defaultProps = {
  className: '',
  labelText: '',
  spanText: ''
};

export default InputColor;
