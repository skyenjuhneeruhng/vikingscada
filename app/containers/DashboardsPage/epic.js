import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { push } from 'react-router-redux';
import axios from 'axios';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as DashboardTypes from './constants';

import { receiveDashboard, cancelDashboard, saveDashboardSuccess, receiveWidget, receiveUpdateWidget, receiveDeleteWidget, receiveWidgetById } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getDashboardEpic(action$) {
  return action$.ofType(DashboardTypes.GET_ONE_DASHBOARD)
    .map((action) => action.payload)
    .switchMap(({ url }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDashboard(result.data) :
            cancelDashboard(result)
        ))
    ));
}

function getWidgetByIdEpic(action$) {
  return action$.ofType(DashboardTypes.GET_WIDGET)
    .map((action) => action.payload)
    .switchMap(({ dashboardId, widgetId }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/account/widget/${dashboardId}/${widgetId}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveWidgetById(result.data) :
            cancelDashboard(result)
        ))
    ));
}

function saveDashboardEpic(action$) {
  return action$.ofType(DashboardTypes.LOCK)
    .map((action) => action.payload)
    .switchMap(({ lock, url, data }) => {
      if (lock) {
        return Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}`, serialize(data)))
          .catch(handleError)
          .map((result) => (
            result && result.data ?
              saveDashboardSuccess('Widgets layout is successfully updated', 'success') :
              cancelDashboard(result)
          ));
      }
      return Observable.of(
        saveDashboardSuccess(
          'Now you can modify widgets. Don\'t forget to save your layout.',
          'warning'
        )
      );
    });
}

function cancelDashboardEpic(action$) {
  return action$.ofType(DashboardTypes.ONE_DASHBOARD_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message === 'Dashboard not found' ? message : `Dashboard ${message}`
      }),
      push('/')
    ));
}

function saveDashboardSuccessEpic(action$) {
  return action$.ofType(DashboardTypes.SAVE_DASHBOARD_SUCCESS)
    .map((action) => action.payload)
    .switchMap(({ message, type }) => Observable.of(
      addNotification({
        type,
        text: message
      })
    ));
}

// Widgets
// Widgets
// Widgets

// function getWidgetsListEpic(action$) {
//   return action$.ofType(DashboardTypes.GET_WIDGETS_LIST)
//     .map((action) => action.payload)
//     .switchMap(({ id }) => (
//       Observable.fromPromise(axios.get(`${DOMAINAPI}/widget/${id}`))
//         .catch(handleError)
//         .map((result) => (
//           result && result.data ?
//             receiveWidgetsList(result.data) :
//             cancelWidgetsList(result)
//         ))
//     ));
// }

function addWidgetEpic(action$) {
  return action$.ofType(DashboardTypes.ADD_WIDGET)
    .map((action) => action.payload)
    .switchMap(({ id, data }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/account/widget/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveWidget(result.data) :
            cancelDashboard(result)
        ))
    ));
}

function editWidgetEpic(action$) {
  return action$.ofType(DashboardTypes.UPDATE_WIDGET)
    .map((action) => action.payload)
    .switchMap(({ data, dashboardId, widgetId }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/account/widget/${dashboardId}/${widgetId}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveUpdateWidget(data, widgetId) :
            cancelDashboard(result)
        ))
    ));
}

function deleteWidgetEpic(action$) {
  return action$.ofType(DashboardTypes.REMOVE_WIDGET)
    .map((action) => action.payload)
    .switchMap(({ dashboardId, widgetId }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/account/widget/${dashboardId}/${widgetId}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeleteWidget(widgetId) :
            cancelDashboard(result)
        ))
    ));
}

// function cancelWidgetReqEpic(action$) {
//   return action$.ofType(DashboardTypes.WIDGETS_LIST_CANCELED)
//     .map((action) => action.payload.message)
//     .switchMap((message) => Observable.of(
//       addNotification({
//         type: 'error',
//         text: message
//       })
//     ));
// }

// function addWidgetSuccessEpic(action$) {
//   return action$.ofType(DashboardTypes.NEW_WIDGET_RECEIVED)
//     .switchMap(() => Observable.of(
//       addNotification({
//         type: 'success',
//         text: 'Widget is successfully added'
//       })
//     ));
// }

// function deleteWidgetSuccessEpic(action$) {
//   return action$.ofType(DashboardTypes.DELETE_WIDGET_RECEIVED)
//     .switchMap(() => Observable.of(
//       addNotification({
//         type: 'success',
//         text: 'Widget is successfully deleted'
//       })
//     ));
// }

// function editWidgetSuccessEpic(action$) {
//   return action$.ofType(DashboardTypes.EDIT_WIDGET_RECEIVED)
//     .switchMap(() => Observable.of(
//       addNotification({
//         type: 'success',
//         text: 'Widget is successfully updated'
//       })
//     ));
// }

function toggleRelesEpic(action$) {
  return action$.ofType(DashboardTypes.TOGGLE_RELES)
    .map((action) => action.payload)
    .switchMap(({ sensorId, reles }) => (
      Observable.fromPromise(
        axios.put(
          `${DOMAINAPI}/command/sensor/${sensorId}`,
          serialize({
            command_name: 'switch',
            args: reles
          })
        )
      )
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            Observable.empty() :
            cancelDashboard(result)
        ))
    ));
}

export default combineEpics(
  getDashboardEpic, saveDashboardEpic, cancelDashboardEpic, saveDashboardSuccessEpic, addWidgetEpic, editWidgetEpic, deleteWidgetEpic, toggleRelesEpic, getWidgetByIdEpic
);
