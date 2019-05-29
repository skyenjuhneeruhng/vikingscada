import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import { RenderInput, InputColor } from './../../../components/FormRenderers';
// import InputColor from '../../UIKit/InputColor';
import { required, number, lessValue, moreValue } from '../../../containers/validation';

const validateNormalLimit = moreValue('normalMax', 'Limit max should be more than normal max');
const validateNormalMax = lessValue('rangeMax', 'Normal max should be less than max');
const validateLimitMax = lessValue('rangeMax', 'Limit max should be less than max');

const validateNormalMin = moreValue('rangeMin', 'Normal max should be more than range min');
const validateLimitMin = moreValue('rangeMin', 'Limit max should be more than range min');
// const validateMinRange = lessValue('rangeMax', 'Min range should be less than max');

/**
 * Indicators for property sidebar
 */
export class Indicators extends React.Component {
  constructor(props) {
    super(props);

    const {
      limitColor, dangerColor, normalColor
    } = props;

    console.log('!!!!!!!', props);

    this.state = {
      colors: [normalColor, '#f1f2f7', limitColor, dangerColor],
      max: {
        normalMax: props.normalMax,
        limitMax: props.limitMax
      }
    };

    this.onNormalChange = this.onChange(0);
    this.onLimitChange = this.onChange(2);
    this.onDangerChange = this.onChange(3);
  }

  onChange = (ind) => (color) => {
    const { colors } = this.state;
    colors[ind] = color;
    this.setState({
      colors
    }, () => {
      this.props.changeColor(this.state.colors);
    });
  }

  onChangeValue = (e) => {
    const { max } = this.state;

    max[`${e.target.name}`] = +e.target.value;
    this.setState({
      max
    }, () => {
      this.props.changeValue(this.state.max);
    });
  }

  render() {
    return (
      <Fragment>
        <div className="max-wrp">
          <div className="max-value">
            <Field
              component={RenderInput}
              type="text"
              name="normalMax"
              labelText="Normal max:"
              className="secondary"
              id="rangeFrom"
              validate={[required, number, validateNormalMin, validateNormalMax]}
            />
            <Field
              component={InputColor}
              type="text"
              name="normalColor"
              id="normalColor"
              validate={[required]}
            />
            {/* <InputColor name="normalColor" className="color" value={normalColor} /> */}
          </div>
          <div className="max-value">
            <Field
              component={RenderInput}
              type="text"
              name="limitMax"
              labelText="Limit max:"
              className="secondary"
              id="rangeTo"
              validate={[required, number, validateLimitMin, validateLimitMax, validateNormalLimit]}
            />
            <Field
              component={InputColor}
              type="text"
              name="limitColor"
              id="limitColor"
              validate={[required]}
            />
            {/* <InputColor onChange={this.onLimitChange} name="limitColor" className="color" value={limitColor} /> */}
          </div>
        </div>

        <div className="max-wrp">
          <span>Danger:</span>
          <div className="max-value">
            <Field
              component={InputColor}
              type="text"
              name="dangerColor"
              id="dangerColor"
              validate={[required]}
            />
            {/* <InputColor onChange={this.onDangerChange} name="dangerColor" className="color" value={dangerColor} /> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

Indicators.propTypes = {
  /**
   * Max value for normal signal
   */
  normalMax: PropTypes.number,

  /**
   * Max value for limit signal
   */
  limitMax: PropTypes.number,

  /**
   * Color for normal signal
   */
  normalColor: PropTypes.string,

  /**
   * Color for limit signal
   */
  limitColor: PropTypes.string,

  /**
   * Color for danger signal
   */
  dangerColor: PropTypes.string,
  changeColor: PropTypes.func,
  changeValue: PropTypes.func
};

Indicators.defaultProps = {
  normalMax: 80,
  limitMax: 90,
  normalColor: '#2a7efd',
  limitColor: '#ffa81f',
  dangerColor: '#ff0018',
  changeColor: () => {},
  changeValue: () => {}
};

export default Indicators;
