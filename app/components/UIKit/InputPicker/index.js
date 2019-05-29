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

  getValidDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }

  handleChange = (date) => {
    this.setState({
      date
    });

    this.props.onChange(date._d);
  }

  render() {
    const {
      id,
      labelText,
      value,
      minDate, maxDate
    } = this.props;

    const date = this.state.date ? this.state.date : value;

    return (
      <Fragment>
        <div className="form-group m-form__group row has-danger">
          <label className="col-form-label col-4 col-sm-4" htmlFor={id}>
            {labelText}
          </label>
          <div className="col-8 col-sm-8">
            <DatePicker
              selected={moment(date)}
              onChange={this.handleChange}
              dateFormat="YYYY-MM-DD"
              className="form-control m-input"
              maxDate={maxDate}
              minDate={minDate}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

InputPicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func
};

InputPicker.defaultProps = {
  labelText: '',
  onChange: () => {}
};

export default InputPicker;
