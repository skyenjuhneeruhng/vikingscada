import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux/lib';

import { serialize, handleError, downloadFile, returnUrl } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as GatewaysListTypes from './constants';

import { receiveGatewaysList, cancelGatewaysList, receiveNewGateway, receiveDeleteGateway, receiveEditGateway } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getGatewaysListEpic(action$) {
  return action$.ofType(GatewaysListTypes.GET_GATEWAYS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveGatewaysList({ ...query, ...result.data }) :
            cancelGatewaysList(result)
        ))
    ));
}

function addGatewayEpic(action$) {
  return action$.ofType(GatewaysListTypes.ADD_NEW_GATEWAY)
    .map((action) => action.payload)
    .switchMap(({ url, data, root }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveNewGateway(result.data, root ? data.site : url) :
            cancelGatewaysList(result)
        ))
    ));
}

function editGatewayEpic(action$) {
  return action$.ofType(GatewaysListTypes.EDIT_GATEWAY)
    .map((action) => action.payload)
    .switchMap(({
      url, id, data, root
    }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveEditGateway(id, result.data, root ? data.site : url) :
            cancelGatewaysList(result)
        ))
    ));
}

function deleteGatewayEpic(action$) {
  return action$.ofType(GatewaysListTypes.DELETE_GATEWAY)
    .map((action) => action.payload)
    .switchMap(({ url, id, siteId }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/${url}/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeleteGateway(id, siteId ? siteId : url) :
            cancelGatewaysList(result)
        ))
    ));
}

function cancelGatewayReqEpic(action$) {
  return action$.ofType(GatewaysListTypes.GATEWAYS_LIST_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function addGatewaySuccessEpic(action$) {
  return action$.ofType(GatewaysListTypes.NEW_GATEWAY_RECEIVED)
    .map((action) => action.payload)
    .switchMap(({ data, url }) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Gateway is successfully added'
      }),
      data.firmware ? downloadFile(data.firmware) : null,
      push(`../gateways/${returnUrl(url)}`)
    ));
}

function deleteGatewaySuccessEpic(action$) {
  return action$.ofType(GatewaysListTypes.DELETE_GATEWAY_RECEIVED)
    .map((action) => action.payload.url)
    .switchMap((url) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Gateway is successfully deleted'
      }),
      push(`../gateways/${returnUrl(url)}`)
    ));
}

function editGatewaySuccessEpic(action$) {
  return action$.ofType(GatewaysListTypes.EDIT_GATEWAY_RECEIVED)
    .map((action) => action.payload)
    .switchMap(({ data, url }) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Gateway is successfully updated'
      }),
      data.firmware ? downloadFile(data.firmware) : null,
      push(`../gateways/${returnUrl(url)}`)
    ));
}

export default combineEpics(
  getGatewaysListEpic, addGatewayEpic, deleteGatewayEpic, editGatewayEpic,
  cancelGatewayReqEpic, addGatewaySuccessEpic, editGatewaySuccessEpic, deleteGatewaySuccessEpic
);
