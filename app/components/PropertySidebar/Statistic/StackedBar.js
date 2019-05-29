import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import moment from 'moment';

import { required } from '../../../containers/validation';

import InputAutoComplete from '../../FormRenderers/InputAutoComplete/justInput';

import InputPicker from '../../FormRenderers/InputPicker';

const StackedBar = (props) => {
  const {
    sensorName, url, getSensorId,
    from, to, updatePeriod
  } = props;
  const validFrom = moment.isMoment(from) ? moment(from).toDate() : from;
  const validTo = moment.isMoment(to) ? moment(to).toDate() : to;

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
        searchName="name_contains"
        placeholder="Type your sensor name"
        sensorId={getSensorId}
        validate={[required]}
      />
      <Field
        component={InputPicker}
        icon="la la-picker"
        id="from"
        value={validTo < validFrom ? validTo : validFrom}
        type="text"
        name="from"
        labelText="* From:"
        className="searsh"
        onChange={updatePeriod('from')}
        autoComplete="off"
        maxDate={from !== to && moment(to)}
        validate={[required]}
      />
      <Field
        component={InputPicker}
        icon="la la-picker"
        id="to"
        value={validTo < validFrom ? validFrom : validTo}
        type="text"
        name="to"
        labelText="* To:"
        className="searsh"
        onChange={updatePeriod('to')}
        autoComplete="off"
        minDate={from !== to && moment(from)}
        validate={[required]}
      />
    </Fragment>
  );
};

StackedBar.propTypes = {
  sensorName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  getSensorId: PropTypes.func.isRequired,
  updatePeriod: PropTypes.func.isRequired
};

export default StackedBar;
