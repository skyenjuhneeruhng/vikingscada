import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import { push } from 'react-router-redux';

import { DOMAINAPI } from './../../config';

import * as ViewCompanyTypes from './constants';
import { handleError } from './../../api_helper';
import { addNotification } from './../NotificationGenerator/actions';
import { receiveCompany, receiveUpdateCompany, receiveDeleteCompany, companyError, receiveUpdateCompanyStatus } from './actions';
import { receiveUpdateListData } from './../ExtraAwesomeList/actions';

function getCompanyByIdEpic(action$) {
  return action$.ofType(ViewCompanyTypes.VIEW_COMPANY)
    .switchMap((action) => {
      const { id } = action.payload;
      return Observable.fromPromise(axios.get(`${DOMAINAPI}/company/${id}`))
        .catch(handleError);
    })
    .map((result) => ((result && result.data) ? receiveCompany(result.data) : companyError(result)));
}

function updateCompanyByIdEpic(action$) {
  return action$.ofType(ViewCompanyTypes.UPDATE_COMPANY)
    .switchMap((action) => {
      const id = action.payload.id || '';
      const company = action.payload.company || {};
      return Observable.fromPromise(axios.put(`${DOMAINAPI}/company/${id}`, company))
        .mergeMap((result) => {
          if (result && result.data) {
            return Observable.of(
              receiveUpdateCompany({ ...company, id }),
              receiveUpdateListData({ ...company, id })
            );
          }
          return companyError(result);
        })
        .catch(handleError);
    });
}

function updateCompanySuccess(action$) {
  return action$.ofType(ViewCompanyTypes.UPDATE_COMPANY_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Company is successfully updated'
      })
    ));
}

function updateCompanyStatusEpic(action$) {
  return action$.ofType(ViewCompanyTypes.UPDATE_COMPANY_STATUS)
    .switchMap((action) => {
      const id = action.payload.id || '';
      const company = action.payload.company || {};
      return Observable.fromPromise(axios.put(`${DOMAINAPI}/company/${id}`, company))
        .map((result) => {
          if (result && result.data) {
            return receiveUpdateCompanyStatus({ ...company, id });
          }
          return companyError(result);
        })
        .catch(handleError);
    });
}

function updateCompanyStatusSuccess(action$) {
  return action$.ofType(ViewCompanyTypes.UPDATE_COMPANY_STATUS_RECEIVED)
    .switchMap(() => Observable.of(
      addNotification({
        type: 'success',
        text: 'Status was successfully updated'
      }),
      push('/')
    ));
}


function deleteCompanyByIdEpic(action$) {
  return action$.ofType(ViewCompanyTypes.DELETE_COMPANY)
    .switchMap((action) => {
      const { id, redirect } = action.payload;
      return Observable.fromPromise(axios.delete(`${DOMAINAPI}/company/${id}`))
        .map((result) => {
          if (result && result.data) {
            return receiveDeleteCompany(result.data.data, redirect);
          }
          return companyError(result);
        })
        .catch(handleError);
    });
}

function deleteCompanySuccess(action$) {
  return action$.ofType(ViewCompanyTypes.DELETE_COMPANY_RECEIVED)
    .map((action) => action.payload.redirect)
    .switchMap((redirect) => Observable.of(
      addNotification({
        type: 'success',
        text: 'Company is successfully deleted'
      }),
      push(redirect)
    ));
}

function companyErrorEpic(action$) {
  return action$.ofType(ViewCompanyTypes.COMPANY_ERROR)
    .map((action) => action.payload.message)
    .switchMap((message) => Observable.of(
      addNotification({
        type: 'error',
        text: message
      }),
      push('/companies')
    ));
}

export default combineEpics(
  getCompanyByIdEpic, updateCompanyByIdEpic,
  updateCompanySuccess, deleteCompanyByIdEpic,
  deleteCompanySuccess, companyErrorEpic,
  updateCompanyStatusEpic, updateCompanyStatusSuccess
);
