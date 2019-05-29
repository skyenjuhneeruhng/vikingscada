import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { DOMAINAPI } from './../../config';

import * as NotificationsTypes from './constants';
import { handleError } from './../../api_helper';
import { getNotificationsList, getNotificationsListSuccess, getNotificationsListCanceled, updateNotificationsSuccess } from './actions';

function getNotificationsListEpic(action$) {
  return action$.ofType(NotificationsTypes.GET_NOTIFICATIONS_LIST)
    .switchMap((action) => {
      const { type } = action.payload;
      return Observable.fromPromise(axios.get(`${DOMAINAPI}/account/priority/${type}`))
        .catch(handleError);
    })
    .map((result) => ((result && result.data) ? getNotificationsListSuccess(result.data) : getNotificationsListCanceled(result)));
}

function updateNotificationsEpic(action$) {
  return action$.ofType(NotificationsTypes.UPDATE_NOTIFICATIONS)
    .map((action) => action.payload)
    .switchMap(({ type, id, action }) => (
      Observable.fromPromise(axios.put(`${DOMAINAPI}/account/priority/${type}/${id}/${action}`))
        .mergeMap((result) => {
          if (result && result.data) {
            return Observable.of(
              updateNotificationsSuccess(result.data),
              getNotificationsList(type)
            );
          }
          return getNotificationsListCanceled(result);
        })
        .catch(handleError)
    ));
}

export default combineEpics(
  getNotificationsListEpic, updateNotificationsEpic
);
