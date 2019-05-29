import React from 'react';
import PropTypes from 'prop-types';

export class Button extends React.Component {
  render() {
    const {
      handleClick, className, label, type, form, disabled
    } = this.props;
    return (
      <button
        type={type}
        form={form}
        className={`btn m-btn--air button button-${className}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  handleClick() {},
  className: 'primary',
  label: '',
  type: 'button',
  form: undefined,
  disabled: false
};

export default Button;
