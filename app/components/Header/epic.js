import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as traffic from './constants';

import { receiveTraffic, cancelTraffic } from './actions';

function getTrafficEpic(action$) {
  return action$.ofType(traffic.GET_TRAFFIC)
    .switchMap(() => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/user/traffic/me`))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveTraffic(result.data) :
            cancelTraffic(result)
        ))
    ));
}


function receiveTrafficEpic(action$) {
  return action$.ofType(traffic.GET_TRAFFIC_RECEIVED)
    .switchMap(() => Observable.of());
}


export default combineEpics(
  getTrafficEpic, receiveTrafficEpic
);
