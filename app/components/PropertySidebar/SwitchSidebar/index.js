import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { RenderInput, RenderCheckbox, InputSwitch } from '../../FormRenderers';

import InputAutoComplete from '../../FormRenderers/InputAutoComplete/justInput';

class SwitchSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: []
    };
  }

  addSensor = (data) => {
    this.setState((prevState) => ({
      contents: [...prevState.contents, data]
    }));
  }

  deleteSensor = (id) => {
    this.setState((prevState) => ({
      contents: prevState.contents.filter((sensor) => sensor.id !== id)
    }));
  }

  renderAdded() {
    return this.state.contents.map((sensor) => (
      <div className="sensor-item">
        {sensor.name}
        <a role="button" className="close-switch-sensor" onClick={() => this.deleteSensor(sensor.id)}>
          <i className="la la-close" />
        </a>
      </div>
    ));
  }

  renderButton = (item, i) => (
    <tr key={`rele${i}`}>
      <td className="name">
        <label>{i}:</label>
      </td>
      <td className="btn">
        <Field
          type="checkbox"
          name={`${item}_mask`}
          component={InputSwitch}
          className="sidebar-switch"
          id={`${item}_mask`}
          label="Enabled"
        />
      </td>
      <td className="btn">
        <Field
          type="checkbox"
          name={`${item}_bitmask_enabled`}
          component={RenderCheckbox}
          id={`${item}_bitmask_enabled`}
          label="Enabled"
        />
      </td>
    </tr>
  )

  render() {
    const {
      sensorName,
      url,
      getSensorId,
      avaliable
    } = this.props;

    const bitmask = this.props.bitmaskNew && this.props.bitmaskNew.split(',');
    return (
      <Fragment>
        <Field
          component={InputAutoComplete}
          type="text"
          name="sensorName"
          sensorName={sensorName}
          labelText="Add sensor:"
          className="secondary"
          id="sensor"
          entity={url}
          value={this.state.contents}
          searchName="name_contains"
          placeholder="Type your sensor name"
          sensorId={getSensorId}
        />

        <Field
          component={RenderInput}
          type="text"
          name="bitmask"
          className="secondary"
          id="bitmask"
          value={bitmask}
          hidden
          containerClass="hidden"
        />
        { bitmask && avaliable &&
          <div className="form-group m-form__group">
            <label>Alerts:</label>
            <table>
              {bitmask && bitmask.map(this.renderButton)}
            </table>
          </div>
        }
        {/* this.state.contents.length > 0 && (
          <div>
            <h3>Added:</h3>
            {this.renderAdded()}
          </div>
        ) */}
      </Fragment>
    );
  }
}

SwitchSidebar.propTypes = {
  sensorName: PropTypes.string.isRequired,
  bitmaskNew: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  getSensorId: PropTypes.func.isRequired,
  avaliable: PropTypes.bool.isRequired
};

export default SwitchSidebar;
