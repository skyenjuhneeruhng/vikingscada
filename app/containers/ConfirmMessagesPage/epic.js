import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { push } from 'react-router-redux';

import { DOMAINAPI } from './../../config';
import { serialize, handleError } from './../../api_helper';


import * as ConfirmTypes from './constants';

import { receiveConfirmMessages } from './actions';

function confirmMessagesEpic(action$) {
  return action$.ofType(ConfirmTypes.CONFIRM_MESSAGES)
    .map((action) => action.payload)
    .switchMap(({ url, code }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/${url}`, serialize(code)))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveConfirmMessages(result.data) :
            push('/404')
        ))
    ));
}

export default combineEpics(
  confirmMessagesEpic
);
