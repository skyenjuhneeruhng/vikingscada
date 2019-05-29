import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getOptions() {
    const options = this.props.option || [];
    return options.map((item) =>
      <option key={shortid.generate()} value={item.value || ''}>{item.name || item}</option>
    );
  }

  render() {
    const {
      input,
      id,
      labelText,
      className,
      spanText,
      meta: { touched, error },
      ...custom
    } = this.props;

    return (
      <div className="form-group m-form__group row has-danger">
        <label className="col-form-label col-sm-4" htmlFor={id}>
          {labelText}
        </label>
        <div className="col-sm-8">
          <div className="vikins-select">
            <select
              className={[
                `form-control m-input slct slct-${className}`,
                touched && error ? 'inpt-errors' : ''
              ].join(' ')}
              id={id}
              {...input}
              {...custom}
            >
              {this.getOptions()}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="8px" height="5px" viewBox="0 0 8 5">
              <path fillRule="evenodd" d="M 7.99 0.72C 7.99 0.72 4 4.99 4 4.99 4 4.99 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 3.33 4.28 0.01 0.72 0.01 0.72 0.01 0.72 0.67 0.01 0.67 0.01 0.67 0.01 4 3.57 4 3.57 4 3.57 7.33 0.01 7.33 0.01 7.33 0.01 7.99 0.72 7.99 0.72Z" />
            </svg>
          </div>
          {touched && error ?
            <div className="form-control-feedback">{error}</div> :
            <span className="m-form__help">{spanText}</span>
          }
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string,
  option: PropTypes.arrayOf(PropTypes.string).isRequired
};
Select.defaultProps = {
  className: '',
  labelText: '',
  spanText: ''
};

export default Select;
