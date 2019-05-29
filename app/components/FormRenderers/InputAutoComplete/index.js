import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getEntities, cleanEntities } from './actions';

const errorMessage = 'The value must be selected from the drop down list';

export class InputAutoComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      show: false,
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
    this.props.changeId('');
  }

  handleClickOutside = (e) => {
    if (this.props.entities.length > 0) {
      this.props.cleanEntities();
    }

    const drpDown = document.getElementById('autocomplete');
    if (!e.path.includes(drpDown) && this.state.show) {
      this.setState({
        show: false
      });
    }
  }

  choseItem = (id) => (e) => {
    this.setState({
      value: e.target.innerHTML,
      show: false,
      chosen: e.target.innerHTML
    });
    this.props.changeId(id);
  }

  fetchData = () => {
    const { value } = this.state;
    const { entity, searchName } = this.props;
    const query = { _limit: 5 };
    query[searchName] = value;

    if (value === '') {
      this.updatePageData();
      this.setState({
        show: false,
        chosen: false
      });
    } else {
      this.props.getEntities(query, entity);
    }
  }

  updatePageData() {
    const { value } = this.state;
    const { entity, searchName } = this.props;
    const query = { _limit: 5 };

    if (value !== '') {
      query[searchName] = value;
      this.props.getEntities(query, entity);
    }
  }

  createList(data, i) {
    return (
      <li key={i} className="dropdown-item" onClick={this.choseItem(data.id)}>{data.company_name || data.name}</li>
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

    const val = this.state.value !== null ? this.state.value : input.value;

    return (
      <div className="form-group m-form__group row has-danger">
        <label className="col-form-label col-sm-4" htmlFor={id}>
          {labelText}
        </label>
        <div className="col-sm-8 autocomplete-wrp">
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
            autoComplete="off"
          />
          {(touched && error) || this.state.chosen !== this.state.value ?
            <div className="form-control-feedback">{ errorMessage || error }</div> :
            <span className="m-form__help">{spanText}</span>
          }
          <ul id="autocomplete" className={`dropdown-menu ${this.state.show && this.props.entities && this.props.entities.length > 0 ? 'show' : null}`}>
            {this.props.entities && this.props.entities.map((data, i) => this.createList(data, i))}
          </ul>
        </div>
      </div>
    );
  }
}

InputAutoComplete.propTypes = {
  id: PropTypes.string,
  editId: PropTypes.string,
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  labelText: PropTypes.string,
  spanText: PropTypes.string,
  entity: PropTypes.string,
  searchName: PropTypes.string,
  getEntities: PropTypes.func,
  changeId: PropTypes.func,
  cleanEntities: PropTypes.func,
  entities: PropTypes.instanceOf(Array)
};

InputAutoComplete.defaultProps = {
  id: '',
  editId: '',
  input: {},
  meta: {},
  className: '',
  labelText: '',
  spanText: '',
  entity: 'company',
  searchName: '',
  getEntities() {},
  changeId() {},
  cleanEntities() {},
  entities: []
};

function mapStateToProps(state) {
  return {
    entities: state.entities && state.entities.list
  };
}

export default connect(mapStateToProps, {
  getEntities, cleanEntities
})(InputAutoComplete);
