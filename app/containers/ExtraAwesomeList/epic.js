import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as ExtraAwesomeListTypes from './constants';

import { receiveListData, cancelListData } from './actions';

function getListDataEpic(action$) {
  return action$.ofType(ExtraAwesomeListTypes.GET_LIST_DATA)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .map((result) => (
          result && result.data ?
            receiveListData({ ...query, ...result.data }) :
            cancelListData(result)
        ))
        .catch(handleError)
    ));
}

export default combineEpics(
  getListDataEpic
);
