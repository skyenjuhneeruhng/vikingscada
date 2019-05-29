import React from 'react';
import PropTypes from 'prop-types';

export class AddButton extends React.Component {
  render() {
    const {
      handleClick, style, iconClass, className
    } = this.props;
    return (
      <button style={style} type="button" className={`btn m-btn--air pluss-button ${className}`} onClick={handleClick}>
        <i className={`la ${iconClass}`} />
      </button>
    );
  }
}

AddButton.propTypes = {
  handleClick: PropTypes.func,
  iconClass: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object)
};

AddButton.defaultProps = {
  handleClick() {},
  iconClass: 'la-plus',
  style: {},
  className: ''
};

export default AddButton;
