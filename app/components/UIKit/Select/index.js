import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.value);
  }

  getOptions() {
    const { options } = this.props;
    return options.map((item) =>
      <option key={shortid.generate()} value={item.value || ''}>{item.name || item}</option>
    );
  }

  render() {
    const {
      type, name, className, value
    } = this.props;
    return (
      <div className="vikins-select">
        <select type={type} value={this.state.value || value} name={name} onChange={this.onChange} className={`form-control m-input slct slct-${className}`}>
          {this.getOptions()}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" width="8px" height="5px" viewBox="0 0 8 5">
          <path fillRule="evenodd" d="M 7.99 0.72C 7.99 0.72 4 4.99 4 4.99 4 4.99 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 0.01 0.72 0.01 0.72 0.01 0.72 0.67 0.01 0.67 0.01 0.67 0.01 4 3.57 4 3.57 4 3.57 7.33 0.01 7.33 0.01 7.33 0.01 7.99 0.72 7.99 0.72Z" />
        </svg>
      </div>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  name: 'name',
  type: 'select',
  value: '',
  options: ['option1', 'option2'],
  className: 'primary'
};

export default Select;
