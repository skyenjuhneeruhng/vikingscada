import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { ADD_NOTIFICATION } from './constants';
import { deleteNotification } from './actions';

function addNotification(action$) {
  return action$.ofType(ADD_NOTIFICATION)
    .map((action) => action.id)
    .delay(5000)
    .switchMap((id) => Observable.of(deleteNotification(id)));
}

export default combineEpics(
  addNotification
);
