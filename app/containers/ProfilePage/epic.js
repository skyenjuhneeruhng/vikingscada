import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from 'axios';

import { handleError, serialize } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as ProfileTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveProfile, receiveUpdateProfile, cancelProfile, receivePendingCount, receiveUpdateUserProfile } from './actions';

function getProfileEpic(action$) {
  return action$.ofType(ProfileTypes.GET_PROFILE)
    .switchMap(() => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/user/me`))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? receiveProfile(result.data) : cancelProfile(result)
    ));
}

function updateProfileEpic(action$) {
  return action$.ofType(ProfileTypes.UPDATE_PROFILE)
    .map((action) => action.payload)
    .switchMap(({ id, data, updateCurrent }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/user/${id}`, data))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            ((updateCurrent && receiveUpdateProfile(result.data)) || receiveUpdateUserProfile()) :
            cancelProfile(result)
        ))
    ));
}

function updateProfileMeEpic(action$) {
  return action$.ofType(ProfileTypes.UPDATE_ME)
    .map((action) => action.payload)
    .switchMap(({ data }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/user/me`, serialize(data)))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? receiveUpdateProfile(result.data) : cancelProfile(result)
    ));
}

function receiveUpdateProfileEpic(action$) {
  return action$.ofType(ProfileTypes.UPDATE_PROFILE_RECEIVED, ProfileTypes.UPDATE_USER_PROFILE_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Profile is successfully updated'
      })
    ));
}

function cancelProfileEpic(action$) {
  return action$.ofType(ProfileTypes.PROFILE_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function getPendingCountEpic(action$) {
  return action$.ofType(ProfileTypes.GET_PENDING_COUNT)
    .switchMap(() => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/company/count?status=pending`))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ?
        receivePendingCount(result.data) :
        cancelProfileEpic(result)
    ));
}

export default combineEpics(
  getProfileEpic, updateProfileEpic, receiveUpdateProfileEpic, cancelProfileEpic, getPendingCountEpic, updateProfileMeEpic
);
