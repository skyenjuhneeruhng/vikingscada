import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from 'axios';

import { handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as InvoiceTypes from './constants';

import { receiveInvoiceById, cancelInvoiceById } from './actions';

function getInvoiceIdEpic(action$) {
  return action$.ofType(InvoiceTypes.GET_INVOICE)
    .switchMap((action) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/payment/transactions/${action.payload.id}`))
        .catch(handleError)
    ))
    .map((result) => ((result && result.data) ? receiveInvoiceById(result.data) : cancelInvoiceById(result)));
}
export default combineEpics(
  getInvoiceIdEpic
);
