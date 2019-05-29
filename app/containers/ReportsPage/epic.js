import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { handleError, downloadFile } from './../../api_helper';

import { DOMAINAPI } from './../../config';

import * as ReportsTypes from './constants';

import { receiveReportsList, cancelReportsList, receiveDownloadReportsList } from './actions';
// import { addNotification } from './../NotificationGenerator/actions';

function getReportsListEpic(action$) {
  return action$.ofType(ReportsTypes.GET_REPORTS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveReportsList(result.data) :
            cancelReportsList(result)
        ))
    ));
}

function downloadReportsListEpic(action$) {
  return action$.ofType(ReportsTypes.DOWNLOAD_REPORTS_LIST)
    .map((action) => action.payload)
    .switchMap(({ url, query }) => (
      Observable.fromPromise(axios.get(`${DOMAINAPI}/${url}`, { params: query }))
        .catch(handleError)
        .map((result) => (
          result && result.data ?
            receiveDownloadReportsList(result.data) :
            cancelReportsList(result)
        ))
    ));
}

function editGatewaySuccessEpic(action$) {
  return action$.ofType(ReportsTypes.DOWNLOAD_REPORTS_LIST_RECEIVED)
    .map((action) => action.payload)
    .switchMap(({ data }) => Observable.of(
      data.url ? downloadFile(data.url) : null
    ));
}


export default combineEpics(
  getReportsListEpic, downloadReportsListEpic, editGatewaySuccessEpic
);
