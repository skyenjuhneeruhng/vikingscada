import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as PurchaseTypes from './constants';

import { receiveTransactionsList, cancelTransactionsList } from './actions';
// import { addNotification } from './../NotificationGenerator/actions';

function getTransactionsListEpic(action$) {
  return action$.ofType(PurchaseTypes.GET_TRANSACTIONS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveTransactionsList(result.data) :
            cancelTransactionsList(result)
        ))
    ));
}

export default combineEpics(
  getTransactionsListEpic
);
