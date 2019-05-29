import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as DashboardsListTypes from './constants';

import { receiveDashboardsList, cancelDashboardsList, receiveNewDashboard, receiveDeleteDashboard, receiveEditDashboard } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getDashboardsListEpic(action$) {
  return action$.ofType(DashboardsListTypes.GET_DASHBOARDS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDashboardsList({ ...query, ...result.data }) :
            cancelDashboardsList(result)
        ))
    ));
}

function addDashboardEpic(action$) {
  return action$.ofType(DashboardsListTypes.ADD_NEW_DASHBOARD)
    .map((action) => action.payload)
    .switchMap(({ url, data }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveNewDashboard(result.data) :
            cancelDashboardsList(result)
        ))
    ));
}

function editDashboardEpic(action$) {
  return action$.ofType(DashboardsListTypes.EDIT_DASHBOARD)
    .map((action) => action.payload)
    .switchMap(({ url, id, data }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveEditDashboard(id, data) :
            cancelDashboardsList(result)
        ))
    ));
}

function deleteDashboardEpic(action$) {
  return action$.ofType(DashboardsListTypes.DELETE_DASHBOARD)
    .map((action) => action.payload)
    .switchMap(({ url, id }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/${url}/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeleteDashboard(id) :
            cancelDashboardsList(result)
        ))
    ));
}

function cancelDashboardReqEpic(action$) {
  return action$.ofType(DashboardsListTypes.DASHBOARDS_LIST_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function addDashboardSuccessEpic(action$) {
  return action$.ofType(DashboardsListTypes.NEW_DASHBOARD_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Dashboard is successfully added'
      })
    ));
}

function deleteDashboardSuccessEpic(action$) {
  return action$.ofType(DashboardsListTypes.DELETE_DASHBOARD_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Dashboard is successfully deleted'
      })
    ));
}

function editDashboardSuccessEpic(action$) {
  return action$.ofType(DashboardsListTypes.EDIT_DASHBOARD_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Dashboard is successfully updated'
      })
    ));
}

export default combineEpics(
  getDashboardsListEpic, addDashboardEpic, deleteDashboardEpic, editDashboardEpic,
  cancelDashboardReqEpic, addDashboardSuccessEpic, editDashboardSuccessEpic, deleteDashboardSuccessEpic
);
