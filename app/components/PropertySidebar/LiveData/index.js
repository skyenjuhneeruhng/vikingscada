import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputAutoComplete from '../../FormRenderers/InputAutoComplete/justInput';
import { RenderInput } from './../../../components/FormRenderers';
import Indicators from '../../PropertySidebar/Indicators';

import { required, number, moreValue } from '../../../containers/validation';

const validateMaxRange = moreValue('rangeMin', 'Max range should be more than min');

const LiveData = (props) => {
  const {
    sensorName,
    getSensorId,
    url,
    avaliable
  } = props;

  return (
    <Fragment>
      <Field
        component={InputAutoComplete}
        type="text"
        name="sensorName"
        sensorName={sensorName}
        labelText="Sensor:"
        className="secondary"
        id="sensor"
        entity={url}
        searchName="name_contains"
        placeholder="Type your sensor name"
        sensorId={getSensorId}
        validate={[required]}
      />
      <div className="range-wrp">
        <span>Range:</span>
        <div className="range-inpts">
          <Field
            component={RenderInput}
            type="text"
            name="rangeMin"
            labelText=""
            className="secondary"
            id="rangeMin"
            validate={[required, number]}
          />
          <Field
            component={RenderInput}
            type="text"
            name="rangeMax"
            labelText=""
            className="secondary"
            id="rangeMax"
            validate={[required, number, validateMaxRange]}
          />
        </div>
      </div>

      { avaliable ? <Indicators /> : null }
    </Fragment>
  );
};

LiveData.propTypes = {
  sensorName: PropTypes.string.isRequired,
  getSensorId: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  avaliable: PropTypes.bool.isRequired
};

export default LiveData;
