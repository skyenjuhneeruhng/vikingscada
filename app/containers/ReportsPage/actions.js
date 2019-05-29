import * as ReportsTypes from './constants';

export function getReportsList(url, query) {
  return {
    type: ReportsTypes.GET_REPORTS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function downloadReportsList(url, query) {
  return {
    type: ReportsTypes.DOWNLOAD_REPORTS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveDownloadReportsList(data) {
  return {
    type: ReportsTypes.DOWNLOAD_REPORTS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function receiveReportsList(data) {
  return {
    type: ReportsTypes.REPORTS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelReportsList(message) {
  return {
    type: ReportsTypes.REPORTS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearReportsList() {
  return {
    type: ReportsTypes.CLEAR_REPORTS_LIST
  };
}
