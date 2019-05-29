import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as CompaniesTypes from './constants';

import { receiveCompanies, cancelCompanies } from './actions';

function getCompaniesEpic(action$) {
  return action$.ofType(CompaniesTypes.GET_COMPANIES)
    .map((action) => action.payload.query)
    .switchMap((query) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/company`, { params: query }))
        .map((result) => (
          result && result.data ?
            receiveCompanies({ ...query, ...result.data }) :
            cancelCompanies(result)
        ))
        .catch(handleError)
    ));
}

export default combineEpics(
  getCompaniesEpic
);
