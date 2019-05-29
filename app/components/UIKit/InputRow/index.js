import React from 'react';
import PropTypes from 'prop-types';

export class InputRow extends React.Component {
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
      type, name, placeholder, className, id, labelText, spanText, required
    } = this.props;
    return (
      <div className="form-group m-form__group row">
        <label className="col-form-label col-sm-3" htmlFor={id}>
          {labelText}
        </label>
        <div className="col-sm-9">
          <input
            type={type}
            value={this.state.value}
            name={name}
            id={id}
            onChange={this.onChange}
            placeholder={placeholder}
            className={`form-control m-input inpt-${className}`}
            required={required}
          />
          <span className="m-form__help">
            {spanText}
          </span>
        </div>
      </div>
    );
  }
}

InputRow.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func
};
InputRow.defaultProps = {
  name: 'name',
  type: 'text',
  id: '',
  labelText: '',
  spanText: '',
  placeholder: '',
  className: 'primary',
  value: '',
  required: false,
  onChange() {}
};

export default InputRow;
