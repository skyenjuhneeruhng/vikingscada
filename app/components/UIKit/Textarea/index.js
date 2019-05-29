import React from 'react';
import PropTypes from 'prop-types';

export class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  }
  render() {
    const {
      name, className, id, labelText, readonly
    } = this.props;
    return (
      <div className="form-group m-form__group">
        <label htmlFor={id}>
          {labelText}
          <textarea
            name={name}
            id={id}
            onChange={this.onChange}
            className={`form-control m-input txtar-${className}`}
            readOnly={readonly}
            value={this.state.value}
          />
        </label>
      </div>
    );
  }
}

Textarea.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  labelText: PropTypes.string,
  className: PropTypes.string,
  readonly: PropTypes.bool
};
Textarea.defaultProps = {
  name: 'name',
  id: 'id',
  labelText: 'label',
  className: 'primary',
  readonly: false,
  value: ''
};

export default Textarea;
