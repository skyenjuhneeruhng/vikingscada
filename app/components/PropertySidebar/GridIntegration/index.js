import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import LiveData from './../LiveData';
import { RenderInput } from './../../../components/FormRenderers';

import { required } from '../../../containers/validation';

const GridIntegration = (props) => {
  const {
    sensorName,
    getSensorId,
    url,
    avaliable
  } = props;

  return (
    <Fragment>
      <Field
        component={RenderInput}
        type="text"
        name="labelName"
        labelText="Label Name:"
        className="secondary"
        id="labelName"
        placeholder="Label name"
        validate={[required]}
      />
      <LiveData url={url} sensorName={sensorName} avaliable={avaliable} getSensorId={getSensorId} />
    </Fragment>
  );
};

GridIntegration.propTypes = {
  sensorName: PropTypes.string.isRequired,
  getSensorId: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  avaliable: PropTypes.bool.isRequired
};

export default GridIntegration;
