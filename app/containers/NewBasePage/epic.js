import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import axios from 'axios';

import { serialize, handleError, ucFirst } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as AddNewTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveAddNewEntity, cancelAddNew, receiveEntity, receiveUpdateEntity, receiveDeleteEntity } from './actions';

function addNewEntityEpic(action$) {
  return action$.ofType(AddNewTypes.ADD_NEW_ENTITY)
    .switchMap((action) => {
      const type = action.payload.type || '';
      const data = action.payload.data || {};
      const redirect = action.payload.redirect || '';
      return Observable.fromPromise(axios.post(`${DOMAINAPI}/${type}`, serialize(data)))
        .catch(handleError)
        .map((result) => ((result && result.data) ? receiveAddNewEntity(result.data, redirect) : cancelAddNew(result)));
    });
}

function receiveAddEntitySiteEpic(action$) {
  return action$.ofType(AddNewTypes.ADD_NEW_ENTITY_RECEIVED)
    .map((action) => action.payload.redirect)
    .switchMap((redirect) => Observable.of(
      addNotification({
        type: 'success',
        text: `${ucFirst(redirect)} is successfully added`
      }),
      push(redirect)
    ));
}

function getEntityByIdEpic(action$) {
  return action$.ofType(AddNewTypes.VIEW_ENTITY)
    .switchMap((action) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${action.payload.entity}/${action.payload.id}`))
        .catch(handleError)
    ))
    .map((result) => ((result && result.data) ? receiveEntity(result.data) : cancelAddNew(result)));
}

function updateEntityByIdEpic(action$) {
  return action$.ofType(AddNewTypes.UPDATE_ENTITY)
    .switchMap((action) => {
      const id = action.payload.id || '';
      const site = action.payload.site || {};
      const entity = action.payload.entity || '';
      const redirect = action.payload.redirect || '';
      return Observable.fromPromise(axios.put(`${DOMAINAPI}/${entity}/${id}`, site))
        .catch(handleError)
        .map((result) => ((result && result.data) ? receiveUpdateEntity({ ...site, id }, redirect) : cancelAddNew(result)));
    });
}
function updateEntitySuccess(action$) {
  return action$.ofType(AddNewTypes.UPDATE_ENTITY_RECEIVED)
    .map((action) => action.payload.redirect)
    .switchMap((redirect) => Observable.of(
      addNotification({
        type: 'success',
        text: `${ucFirst(redirect)} is successfully updated`
      }),
      // push(`../${changeRouts(redirect)}`)
      push(redirect)
    ));
}

function deleteEntityByIdEpic(action$) {
  return action$.ofType(AddNewTypes.DELETE_ENTITY)
    .switchMap((action) => {
      const { id, entity, redirect } = action.payload;
      return Observable.fromPromise(axios.delete(`${DOMAINAPI}/${entity}/${id}`))
        .catch(handleError)
        .map((result) => ((result && result.data) ? receiveDeleteEntity(result.data.data, redirect) : cancelAddNew(result)));
    });
}

function deleteEntitySuccess(action$) {
  return action$.ofType(AddNewTypes.DELETE_ENTITY_RECEIVED)
    .map((action) => action.payload.redirect)
    .switchMap((redirect) => Observable.of(
      addNotification({
        type: 'success',
        text: `${ucFirst(redirect)} is successfully deleted`
      }),
      // push(`../${changeRouts(redirect)}`)
      push(redirect)
    ));
}

function cancelAddNewEpic(action$) {
  return action$.ofType(AddNewTypes.ADD_NEW_ENTITY_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}


export default combineEpics(
  addNewEntityEpic, receiveAddEntitySiteEpic, cancelAddNewEpic, getEntityByIdEpic, updateEntityByIdEpic, updateEntitySuccess, deleteEntityByIdEpic, deleteEntitySuccess
);
