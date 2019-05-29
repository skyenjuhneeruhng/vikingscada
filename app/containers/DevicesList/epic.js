import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux/lib';

import { serialize, handleError, returnUrl } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as DevicesListTypes from './constants';

import { receiveDevicesList, cancelDevicesList, receiveNewDevice, receiveDeleteDevice, receiveEditDevice } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getDevicesListEpic(action$) {
  return action$.ofType(DevicesListTypes.GET_DEVICES_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDevicesList({ ...query, ...result.data }) :
            cancelDevicesList(result)
        ))
    ));
}

function addDeviceEpic(action$) {
  return action$.ofType(DevicesListTypes.ADD_NEW_DEVICE)
    .map((action) => action.payload)
    .switchMap(({ url, data, root }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveNewDevice(result.data, root ? data.site : url) :
            cancelDevicesList(result)
        ))
    ));
}

function editDeviceEpic(action$) {
  return action$.ofType(DevicesListTypes.EDIT_DEVICE)
    .map((action) => action.payload)
    .switchMap(({
      url, id, data, root
    }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveEditDevice(id, result.data, root ? data.site : url) :
            cancelDevicesList(result)
        ))
    ));
}

function deleteDeviceEpic(action$) {
  return action$.ofType(DevicesListTypes.DELETE_DEVICE)
    .map((action) => action.payload)
    .switchMap(({ url, id, siteId }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/${url}/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeleteDevice(id, siteId ? siteId : url) :
            cancelDevicesList(result)
        ))
    ));
}

function cancelDeviceReqEpic(action$) {
  return action$.ofType(DevicesListTypes.DEVICES_LIST_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function addDeviceSuccessEpic(action$) {
  return action$.ofType(DevicesListTypes.NEW_DEVICE_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Device is successfully added'
      }),
      push(`../devices/${returnUrl(url)}`)
    ));
}

function deleteDeviceSuccessEpic(action$) {
  return action$.ofType(DevicesListTypes.DELETE_DEVICE_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Device is successfully deleted'
      }),
      push(`../devices/${returnUrl(url)}`)
    ));
}

function editDeviceSuccessEpic(action$) {
  return action$.ofType(DevicesListTypes.EDIT_DEVICE_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Device is successfully updated'
      }),
      push(`../devices/${returnUrl(url)}`)
    ));
}

export default combineEpics(
  getDevicesListEpic, addDeviceEpic, deleteDeviceEpic, editDeviceEpic,
  cancelDeviceReqEpic, addDeviceSuccessEpic, editDeviceSuccessEpic, deleteDeviceSuccessEpic
);
