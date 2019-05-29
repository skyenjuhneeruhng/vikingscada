import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux';

import { handleError, serialize } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as PurchaseTypes from './constants';

import { receivePaymentsList, cancelPaymentsList, receivePublicKey, receiveSubscribed, receiveUnSubscribed } from './actions';
import { addNotification } from './../NotificationGenerator/actions';

function getPaymentsListEpic(action$) {
  return action$.ofType(PurchaseTypes.GET_PAYMENTS_LIST)
    .switchMap(() => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/payment/plans`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receivePaymentsList(result.data) :
            cancelPaymentsList(result)
        ))
    ));
}

function getPublicKeyEpic(action$) {
  return action$.ofType(PurchaseTypes.GET_PUBLIC_KEY)
    .switchMap(() => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/payment/public-key`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receivePublicKey(result.data) :
            cancelPaymentsList(result)
        ))
    ));
}

function subscribedEpic(action$) {
  return action$.ofType(PurchaseTypes.SUBSCRIBED)
    .map((action) => action.payload)
    .switchMap(({ url, data, correctEmail }) => (
      correctEmail ? Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(data)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveSubscribed(result.data) :
            cancelPaymentsList(result)
        )) : Observable.of(receiveSubscribed())
    )
    );
}

function receiveSubscribedEpic(action$) {
  return action$.ofType(PurchaseTypes.SUBSCRIBED_RECEIVED)
    .map((action) => action.payload.data)
    .switchMap((data) => Observable.of(
      data && data.ok ? push('../payment/success') : push('../payment/cancel')
    ));
}


function unSubscribedEpic(action$) {
  return action$.ofType(PurchaseTypes.UN_SUBSCRIBED)
    .switchMap(() => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/payment/unsubscribe/me`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveUnSubscribed(result.data) :
            cancelPaymentsList(result)
        ))
    ));
}

function receiveUnSubscribedEpic(action$) {
  return action$.ofType(PurchaseTypes.UN_SUBSCRIBED_RECEIVED)
    .map((action) => action.payload.data)
    .switchMap((data) => Observable.of(
      data && data.ok ?
        addNotification({
          type: 'success',
          text: 'You are unsubscribed!'
        }) : null,
      push('/')
    ));
}

export default combineEpics(
  getPaymentsListEpic, getPublicKeyEpic, subscribedEpic, receiveSubscribedEpic, unSubscribedEpic, receiveUnSubscribedEpic
);
