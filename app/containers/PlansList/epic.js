import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux/lib';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as PlansListTypes from './constants';

import { receivePlansList, cancelPlansList, receiveNewPlan, receiveDeletePlan, receiveEditPlan } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getPlansListEpic(action$) {
  return action$.ofType(PlansListTypes.GET_PLANS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receivePlansList({ ...query, ...result.data }) :
            cancelPlansList(result)
        ))
    ));
}

function addPlanEpic(action$) {
  return action$.ofType(PlansListTypes.ADD_NEW_PLAN)
    .map((action) => action.payload)
    .switchMap(({ url, data }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveNewPlan(result.data, url) :
            cancelPlansList(result)
        ))
    ));
}

function editPlanEpic(action$) {
  return action$.ofType(PlansListTypes.EDIT_PLAN)
    .map((action) => action.payload)
    .switchMap(({ url, id, data }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/${url}/${id}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveEditPlan(id, result.data, url) :
            cancelPlansList(result)
        ))
    ));
}

function deletePlanEpic(action$) {
  return action$.ofType(PlansListTypes.DELETE_PLAN)
    .map((action) => action.payload)
    .switchMap(({ url, id }) => (
      Observable.fromPromise(axios.delete(`${DOMAINAPI}/${url}/${id}`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDeletePlan(id, url) :
            cancelPlansList(result)
        ))
    ));
}

function cancelPlanReqEpic(action$) {
  return action$.ofType(PlansListTypes.PLANS_LIST_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function addPlanSuccessEpic(action$) {
  return action$.ofType(PlansListTypes.NEW_PLAN_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Plan is successfully added'
      }),
      push('../plans')
    ));
}

function deletePlanSuccessEpic(action$) {
  return action$.ofType(PlansListTypes.DELETE_PLAN_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Plan is successfully deleted'
      }),
      push('../plans')
    ));
}

function editPlanSuccessEpic(action$) {
  return action$.ofType(PlansListTypes.EDIT_PLAN_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Plan is successfully updated'
      }),
      push('../plans')
    ));
}

export default combineEpics(
  getPlansListEpic, addPlanEpic, deletePlanEpic, editPlanEpic,
  cancelPlanReqEpic, addPlanSuccessEpic, editPlanSuccessEpic, deletePlanSuccessEpic
);
