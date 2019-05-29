import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as ResetPasswordTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveResetPassword, cancelResetPassword, confirmResetPassword } from './actions';

function requestEmailEpic(action$) {
  return action$.ofType(ResetPasswordTypes.REQUEST_FORGOT_EMAIL)
    .map((action) => action.payload.email)
    .switchMap((email) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/auth/forgot-password`, serialize({ email })))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? receiveResetPassword(result.data) : cancelResetPassword(result)
    ));
}

function receiveResetPasswordEpic(action$) {
  return action$.ofType(ResetPasswordTypes.FORGOT_EMAIL_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'The reset password link has been sent to your email.'
      })
    ));
}

function sendResetPasswordEpic(action$) {
  return action$.ofType(ResetPasswordTypes.SEND_RESET_PASSWORD)
    .map((action) => action.payload.data)
    .switchMap((data) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/auth/reset-password`, serialize(data)))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data ? confirmResetPassword(result.data) : cancelResetPassword(result)
    ));
}

function confirmResetPasswordEpic(action$) {
  return action$.ofType(ResetPasswordTypes.RESET_PASSWORD_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Your password has been changed.'
      }),
      push('/login')
    ));
}

function cancelResetPasswordEpic(action$) {
  return action$.ofType(ResetPasswordTypes.FORGOT_EMAIL_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

export default combineEpics(
  requestEmailEpic, receiveResetPasswordEpic, sendResetPasswordEpic, confirmResetPasswordEpic, cancelResetPasswordEpic
);
