import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Switch from './../../UIKit/Switch';

import withPreloader from '../HOCS/withPreloader';

import { toggleReles } from './../../../containers/DashboardsPage/actions';

class SwitchButton extends Component {
  renderButton = (item, i) => (
    <tr key={`rele${i}`}>
      <th className="name">
        <span>{i}:</span>
      </th>
      <th className="btn">
        <span>
          <Switch
            switchedOn={item[i]}
            onToggle={(state) => {
              const data = this.props.data[this.props.data.length - 1];
              const reles = data ? JSON.parse(data) : [];

              const newReles = reles.slice();
              newReles[i] = { [`${i}`]: state ? 1 : 0 };
              this.props.toggleReles(this.props.sensorId, newReles);
            }}
          />
        </span>
      </th>
    </tr>
  )

  render() {
    const data = this.props.data[this.props.data.length - 1];
    const reles = data ? JSON.parse(data) : [];

    console.log('reles', reles);
    return (
      <div className="switch-container">
        <table>
          {typeof reles === 'number' && <span className="m--font-danger">A bit-mask sensor should be used for this widget</span> }
          {reles && Array.isArray(reles) && reles.map(this.renderButton)}
        </table>
      </div>
    );
  }
}

SwitchButton.propTypes = {
  data: PropTypes.instanceOf(Array),
  toggleReles: PropTypes.func.isRequired,
  sensorId: PropTypes.string.isRequired
};

SwitchButton.defaultProps = {
  data: []
};

const ruleForPreloadre = (value) => value;

export default connect(null, { toggleReles })(withPreloader(SwitchButton, null, ruleForPreloadre));
