import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from 'axios';

import { handleError } from './../../../api_helper';
import { DOMAINAPI } from './../../../config';

import * as StatisticTypes from './constants';

import { receiveStatistic, cancelStatistic } from './actions';
import { addNotification } from './../../../containers/NotificationGenerator/actions';

function getStatisticEpic(action$) {
  return action$.ofType(StatisticTypes.GET_BAR_STATISTIC)
    .map((action) => action.payload)
    .mergeMap(({ id, sensorId, date }) => (
      Observable.fromPromise(axios.get(
        `${DOMAINAPI}/account/alerts/${sensorId}/`,
        {
          params: {
            date
          }
        }
      ))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveStatistic(id, date, result.data) :
            cancelStatistic(result)
        ))
    ));
}

function cancelStatisticEpic(action$) {
  return action$.ofType(StatisticTypes.BAR_STATISTIC_CANCEL)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

export default combineEpics(getStatisticEpic, cancelStatisticEpic);
