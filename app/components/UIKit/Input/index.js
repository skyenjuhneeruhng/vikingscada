import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value || '' };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }
  render() {
    const {
      type, name, placeholder, className, id, containerClass, labelText, error, icon, ...rest
    } = this.props;
    return (
      <div className={`form-group m-form__group ${containerClass}`}>
        <label htmlFor={id}>
          {labelText}
          <input
            className={[
              `form-control m-input inpt-${className}`,
              error ? `inpt-${className}error` : ''
            ].join(' ')}
            type={type}
            value={this.state.value}
            name={name}
            id={id}
            onChange={this.onChange}
            placeholder={placeholder}
            // autoComplete="off"
            {...rest}
          />

          {icon ? <span className="m-input-icon__icon m-input-icon__icon--left"><span><i className={icon} /></span></span> : null}
          {error && <div className="form-control-feedback">{error}</div>}
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};
Input.defaultProps = {
  name: 'name',
  type: 'text',
  id: '',
  labelText: '',
  placeholder: '',
  className: 'primary',
  icon: '',
  value: '',
  onChange() {},
  error: false
};

export default Input;
