import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from 'axios';

import { handleError } from './../../../api_helper';
import { DOMAINAPI } from './../../../config';

import * as StatisticTypes from './constants';

import { receiveStatistic, cancelStatistic } from './actions';
import { addNotification } from './../../../containers/NotificationGenerator/actions';

function getStatisticEpic(action$) {
  return action$.ofType(StatisticTypes.GET_STATISTIC)
    .map((action) => action.payload)
    .mergeMap(({
      id, sensorId, from, to
    }) => (
      Observable.fromPromise(axios.get(
        `${DOMAINAPI}/account/statistic/${sensorId}/`,
        {
          params: {
            _start: 0,
            _limit: 6000,
            from,
            to
          }
        }
      ))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveStatistic(id, result.data) :
            cancelStatistic(result)
        ))
    ));
}

function cancelStatisticEpic(action$) {
  return action$.ofType(StatisticTypes.STATISTIC_CANCEL)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

export default combineEpics(getStatisticEpic, cancelStatisticEpic);
