import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import axios from 'axios';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as SignUpTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveSignUp, cancelSignUp, receiveSignUpWithoutVer } from './actions';

function signUpEpic(action$) {
  return action$.ofType(SignUpTypes.SIGN_UP)
    .map((action) => action.payload.data)
    .switchMap((user) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/company/register`, serialize(user)))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? receiveSignUp(result.data) : cancelSignUp(result)
    ));
}

function receiveSignUpEpic(action$) {
  return action$.ofType(SignUpTypes.SIGN_UP_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'You\'re sign up.'
      }),
      push('/verify')
    ));
}

function signUpWithoutVerEpic(action$) {
  return action$.ofType(SignUpTypes.SIGN_UP_WITHOUT_VER)
    .map((action) => action.payload.data)
    .switchMap((user) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/company/register`, serialize(user)))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? receiveSignUpWithoutVer(result.data) : cancelSignUp(result)
    ));
}

function receiveSignUpWithoutVerEpic(action$) {
  return action$.ofType(SignUpTypes.SIGN_UP_WITHOUT_VER_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Company is successfully added'
      }),
      push('/companies')
    ));
}

function cancelSignUpEpic(action$) {
  return action$.ofType(SignUpTypes.SIGN_UP_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

export default combineEpics(
  signUpEpic, receiveSignUpEpic, signUpWithoutVerEpic, receiveSignUpWithoutVerEpic, cancelSignUpEpic
);
