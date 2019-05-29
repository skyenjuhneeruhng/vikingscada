import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux';

import { serialize, handleError } from './../../api_helper';
import { DOMAINAPI } from './../../config';

import * as SignInTypes from './constants';

import { addNotification } from './../NotificationGenerator/actions';
import { receiveSignIn, cancelSignIn } from './actions';

function signInEpic(action$) {
  return action$.ofType(SignInTypes.SIGN_IN)
    .map((action) => action.payload.data)
    .switchMap(({ remember, ...user }) => (
      Observable.fromPromise(axios.post(`${DOMAINAPI}/auth/local`, serialize(user)))
        .catch(handleError)
        .map((result) => (
          result && result.data ? receiveSignIn(result.data, remember) : cancelSignIn(result)
        ))
    ));
}

function returnUrl(user) {
  const type = user && user.role && user.role.type;
  switch (type) {
    case 'company': return '../company/sites';
    case 'managers': return user && user.dashboards && user.dashboards.length > 0 ? `../dashboard/${user && user.site_manager && user.site_manager.id}-${user && user.dashboards && user.dashboards[0]}` : '/';
    case 'viewers': return user && user.dashboards && user.dashboards.length > 0 ? `../dashboard/${user && user.site_viewer && user.site_viewer.id}-${user && user.dashboards && user.dashboards[0]}` : '/';
    default:
      return '';
  }
}

function receiveSignIpEpic(action$, state$) {
  return action$.ofType(SignInTypes.SIGN_IN_RECEIVED)
    .map((action) => action.payload.data)
    .switchMap(({ user }) => {
      const correctUrl = state$.getState && state$.getState().redirect === '/' ? returnUrl(user) : state$.getState().redirect;
      console.log('user', user);
      console.log('correctUrl', correctUrl);
      const redirect = user && user.verified ? correctUrl : '/verify';
      return Observable.of(
        addNotification({
          type: 'success',
          text: 'You have logged in'
        }),
        push(redirect)
      );
    });
}

function cancelSignInEpic(action$) {
  return action$.ofType(SignInTypes.SIGN_IN_CANCELED)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      })
    ));
}

function logoutEpic(action$) {
  return action$.ofType(SignInTypes.USER_LOGOUT)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'You\'re logged out.'
      })
    ));
}

export default combineEpics(
  signInEpic, receiveSignIpEpic, cancelSignInEpic, logoutEpic
);
