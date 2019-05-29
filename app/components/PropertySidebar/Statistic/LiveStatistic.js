import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import moment from 'moment';

import { required } from '../../../containers/validation';

import InputAutoComplete from '../../FormRenderers/InputAutoComplete/justInput';

import InputPicker from '../../FormRenderers/InputPicker';

const LiveStatistic = (props) => {
  const {
    sensorName, url, getSensorId,
    from, updatePeriod
  } = props;

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
        value={moment(from).toDate()}
        type="text"
        name="from"
        labelText="* Day:"
        className="searsh"
        onChange={updatePeriod('from')}
        autoComplete="off"
        validate={[required]}
      />
    </Fragment>
  );
};

LiveStatistic.propTypes = {
  sensorName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  getSensorId: PropTypes.func.isRequired,
  updatePeriod: PropTypes.func.isRequired
};

export default LiveStatistic;
