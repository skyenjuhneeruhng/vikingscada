import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as VerifyTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveVerify, cancelVerify, verifySMSsent } from './actions';

function sendVerifySMSEpic(action$) {
  return action$.ofType(VerifyTypes.SEND_VERIFY_SMS)
    .switchMap(() => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/company/request/verificaton`))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data === 'OK' ? verifySMSsent() : cancelVerify(result)
    ));
}

function sentVerifyCodeEpic(action$) {
  return action$.ofType(VerifyTypes.VERIFY_SMS_SENT)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'The verification code has been sent to your phone number.'
      })
    ));
}

function verifyEpic(action$) {
  return action$.ofType(VerifyTypes.VERIFY)
    .map((action) => action.payload.code)
    .switchMap((code) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/company/verify`, serialize(code)))
        .catch(handleError)
    ))
    .map((result) => (
      result && result.data === 'OK' ? receiveVerify() : cancelVerify(result)
    ));
}

function receiveVerifyEpic(action$) {
  return action$.ofType(VerifyTypes.VERIFY_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'You\'re verified.'
      }),
      push('/')
    ));
}

function cancelVerifyEpic(action$) {
  return action$.ofType(VerifyTypes.VERIFY_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

export default combineEpics(
  sendVerifySMSEpic, sentVerifyCodeEpic, verifyEpic, receiveVerifyEpic, cancelVerifyEpic
);
