import React, { Fragment } from 'react';
import { Field } from 'redux-form';

import { RenderInput } from './../../../components/FormRenderers';

import { required, number, inRange } from '../../../containers/validation';

const latitudeRange = inRange([-90, 90], 'The value should be in range of -90 to 90.');
const longitudeRange = inRange([-180, 180], 'The value should be in range of -180 to 180.');

const MapChart = () => (
  <Fragment>
    <div className="range-wrp">
      <span>Location</span>
      <div className="range-inpts longitude">
        <Field
          component={RenderInput}
          type="text"
          name="lat"
          labelText="Latitude:"
          className="secondary"
          placeholder="Latitude"
          id="lat"
          validate={[required, number, latitudeRange]}
        />
        <Field
          component={RenderInput}
          type="text"
          name="long"
          labelText="Longitude:"
          className="secondary"
          placeholder="Longitude"
          id="long"
          validate={[required, number, longitudeRange]}
        />
      </div>
      <div className="range-inpts">
        <Field
          component={RenderInput}
          type="text"
          name="zoom"
          labelText="Zoom:"
          className="secondary"
          placeholder="Zoom"
          id="zoom"
          validate={[number]}
        />
      </div>
    </div>
  </Fragment>
);


export default MapChart;
