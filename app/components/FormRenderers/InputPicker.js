import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import moment from 'moment';

export class InputPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null
    };
  }

  handleChange = (date) => {
    this.setState({
      date
    });
    this.props.input.onChange(moment(date).startOf('date'));
  }

  render() {
    const {
      id,
      labelText,
      spanText,
      input,
      maxDate,
      minDate,
      meta: { touched, error }
    } = this.props;

    return (
      <Fragment>
        <div className="form-group m-form__group row has-danger">
          <label className="col-form-label col-sm-4" htmlFor={id}>
            {labelText}
          </label>
          <div className="col-sm-8">
            <DatePicker
              selected={input.value && moment(input.value)}
              onChange={this.handleChange}
              dateFormat="DD/MM/YYYY"
              data={Date.now()}
              className="form-control m-input"
              minDate={minDate}
              maxDate={maxDate}
            />
            {touched && error ?
              <div className="form-control-feedback">{error}</div> :
              <span className="m-form__help">{spanText}</span>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

InputPicker.propTypes = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  labelText: PropTypes.string,
  spanText: PropTypes.string,
  input: PropTypes.instanceOf(Object).isRequired,
  maxDate: PropTypes.instanceOf(Object).isRequired,
  minDate: PropTypes.instanceOf(Object).isRequired
};

InputPicker.defaultProps = {
  labelText: '',
  spanText: ''
};

export default InputPicker;
