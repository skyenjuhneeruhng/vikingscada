import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux/lib';

import { serialize, handleError, returnUrl } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as SensorsListTypes from './constants';

import { receiveSensorsList, cancelSensorsList, receiveNewSensor, receiveDeleteSensor, receiveEditSensor } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getSensorsListEpic(action$) {
  return action$.ofType(SensorsListTypes.GET_SENSORS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveSensorsList({ ...query, ...result.data }) :
            cancelSensorsList(result)
        ))
    ));
}

function addSensorEpic(action$) {
  return action$.ofType(SensorsListTypes.ADD_NEW_SENSOR)
    .map((action) => action.payload)
    .switchMap(({ url, data, root }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveNewSensor(result.data, root ? data.site : url) :
            cancelSensorsList(result)
        ))
    ));
}

function editSensorEpic(action$) {
  return action$.ofType(SensorsListTypes.EDIT_SENSOR)
    .map((action) => action.payload)
    .switchMap(({
      url, id, data, root
    }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveEditSensor(id, result.data, root ? data.site : url) :
            cancelSensorsList(result)
        ))
    ));
}

function deleteSensorEpic(action$) {
  return action$.ofType(SensorsListTypes.DELETE_SENSOR)
    .map((action) => action.payload)
    .switchMap(({ url, id, siteId }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/${url}/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeleteSensor(id, siteId ? siteId : url) :
            cancelSensorsList(result)
        ))
    ));
}

function cancelSensorReqEpic(action$) {
  return action$.ofType(SensorsListTypes.SENSORS_LIST_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function addSensorSuccessEpic(action$) {
  return action$.ofType(SensorsListTypes.NEW_SENSOR_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Sensor is successfully added'
      }),
      push(`../sensors/${returnUrl(url)}`)
    ));
}

function deleteSensorSuccessEpic(action$) {
  return action$.ofType(SensorsListTypes.DELETE_SENSOR_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Sensor is successfully deleted'
      }),
      push(`../sensors/${returnUrl(url)}`)
    ));
}

function editSensorSuccessEpic(action$) {
  return action$.ofType(SensorsListTypes.EDIT_SENSOR_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Sensor is successfully updated'
      }),
      push(`../sensors/${returnUrl(url)}`)
    ));
}

export default combineEpics(
  getSensorsListEpic, addSensorEpic, deleteSensorEpic, editSensorEpic,
  cancelSensorReqEpic, addSensorSuccessEpic, editSensorSuccessEpic, deleteSensorSuccessEpic
);
