import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/lib/Modal';

import { SketchPicker } from 'react-color';
import { Field } from 'redux-form';

import { RenderInput } from '../../FormRenderers';

export class InputColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.value || 'red',
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
      name,
    } = this.props;

    return (
      <Fragment>
        <div className="form-group m-form__group">
          <div className="color-block-wrp" onClick={this.handleClick} role="presentation">
            <div className="color-block" style={{ backgroundColor: this.state.color }} />

          </div>
        </div>

        <Modal onHide={this.handleClose} show={this.state.displayColorPicker} className="color-modal">
          <div className="color-popup" >
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        </Modal>

      </Fragment>
    );
  }
}

InputColor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  // id: PropTypes.string,
  // placeholder: PropTypes.string,
  // className: PropTypes.string
  onChange: PropTypes.func
};
InputColor.defaultProps = {
  name: 'name',
  value: '#000',
  // id: '',
  // placeholder: '',
  // className: 'primary'
  onChange: () => {}
};

export default InputColor;
