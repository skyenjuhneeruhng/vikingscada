import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { handleError } from './../../../api_helper';
import { DOMAINAPI } from './../../../config';

import * as EntitiesTypes from './constants';

import { receiveEntities, cancelEntities, receiveAvaliableAlertForSensor } from './actions';

function getEntitiesEpic(action$) {
  return action$.ofType(EntitiesTypes.GET_ENTITIES)
    .switchMap((action) => {
      const entity = action.payload.entity || '';
      const query = action.payload.query || {};
      return Observable.fromPromise(axios.get(`${DOMAINAPI}/${entity}`, { params: query }))
        .map((result) => (
          result && result.data ?
            receiveEntities({ ...query, ...result.data }) :
            cancelEntities(result)
        ))
        .catch(handleError);
    });
}

function avaliableAlertForSensorEpic(action$) {
  return action$.ofType(EntitiesTypes.AVALIABLE_SENSOR)
    .map((action) => action.payload)
    .switchMap(({ id }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/alerts/avaliable/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveAvaliableAlertForSensor(result.data) :
            cancelEntities(result)
        ))
    ));
}

export default combineEpics(
  getEntitiesEpic, avaliableAlertForSensorEpic
);
