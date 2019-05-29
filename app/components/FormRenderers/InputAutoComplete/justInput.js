import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getEntities, cleanEntities, avaliableAlertForSensor } from './actions';

const errorMessage = 'The value must be selected from the drop down list';

export class InputAutoComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      show: true,
      chosen: null
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editId && nextProps.editId === '' && !nextProps.meta.active) {
      this.setState({
        value: '',
        chosen: ''
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
    this.props.cleanEntities();
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
      show: true
    }, this.fetchData);
  }

  onFocus = (e) => {
    if (e.target.value === '' && this.props.cleanValue && this.state.chosen) {
      this.setState({
        chosen: null,
        value: null
      });
      this.inputRef.blur();
    } else if (e.target.value === '') {
      this.setState({
        value: e.target.value,
        show: true
      }, this.fetchData);
    }
  }

  handleClickOutside = (e) => {
    // if (this.props.entities.length > 0) {
    //   this.props.cleanEntities();
    // }

    const drpDown = document.getElementById('autocomplete');
    const sensor = document.getElementById('sensor');
    if (!e.path.includes(drpDown) && !e.path.includes(sensor) && this.state.show) {
      this.setState({
        show: false
      });
    }
  }

  choseItem = (data) => () => {
    this.props.avaliableAlertForSensor(data && data.id);
    if (this.props.cleanValue) {
      this.props.sensorId(data);
      this.setState({
        show: false,
        chosen: data && data.name
      });
    } else {
      this.setState({
        value: data && data.name,
        show: false,
        chosen: data && data.name
      }, () => { this.props.sensorId(data); }
      );
    }
  }

  fetchData = () => {
    this.updatePageData();
    this.setState({
      chosen: false
    });
  }

  updatePageData() {
    const { value } = this.state;
    const { entity, searchName } = this.props;
    const query = { _limit: 5 };

    query[searchName] = value;
    this.props.getEntities(query, entity);
  }

  createList(data, i) {
    return (
      <li key={i} className="dropdown-item" onClick={this.choseItem(data)}>
        <div>
          <span>Sensor:</span>
          <span>{data && data.name}</span>
        </div>
        <div>
          <span>Device:</span>
          <span>{data && data.device && data.device.name}</span>
        </div>
        <div>
          <span>Gateway:</span>
          <span>{data && data.device && data.device.gateway && data.device.gateway.name}</span>
        </div>
      </li>
    );
  }

  render() {
    const {
      input,
      id,
      labelText,
      className,
      spanText,
      sensorName,
      meta: { touched, error },
      ...custom
    } = this.props;

    const val = this.state.value !== null ? this.state.value : sensorName;

    return (
      <div className="form-group m-form__group has-danger">
        <label className="" htmlFor={id}>
          {labelText}
          <div className="autocomplete-wrp">
            <input
              className={[
                `form-control m-input inpt-${className}`,
                (touched && error) || this.state.chosen !== this.state.value ? 'inpt-errors' : ''
              ].join(' ')}
              id={id}
              {...input}
              {...custom}
              value={val}
              onChange={this.onChange}
              onFocus={this.onFocus}
              ref={(ref) => { this.inputRef = ref; }}
              // onClick={this.onClick}
              autoComplete="off"
            />
            <ul id="autocomplete" className={`dropdown-menu ${this.state.show && this.props.entities && this.props.entities.length > 0 ? 'show' : null}`}>
              {this.props.entities.map((data, i) => this.createList(data, i))}
            </ul>
            {(touched && error) || this.state.chosen !== this.state.value ?
              <div className="form-control-feedback">{ errorMessage || error }</div> :
              <span className="m-form__help">{spanText}</span>
            }
          </div>
        </label>
      </div>
    );
  }
}

InputAutoComplete.propTypes = {
  id: PropTypes.string.isRequired,
  sensorId: PropTypes.string.isRequired,
  sensorName: PropTypes.string.isRequired,
  sensorValue: PropTypes.string.isRequired,
  editId: PropTypes.string.isRequired,
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string,
  entity: PropTypes.string,
  searchName: PropTypes.string.isRequired,
  getEntities: PropTypes.func.isRequired,
  changeId: PropTypes.func.isRequired,
  cleanEntities: PropTypes.func.isRequired,
  cleanValue: PropTypes.bool,
  entities: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.bool.isRequired
};

InputAutoComplete.defaultProps = {
  className: '',
  labelText: '',
  spanText: '',
  entity: 'company',
  cleanValue: false
};

function mapStateToProps(state) {
  return {
    entities: state.entities.list
  };
}

export default connect(mapStateToProps, {
  getEntities, cleanEntities, avaliableAlertForSensor
})(InputAutoComplete);
