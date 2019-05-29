import * as ExtraAwesomeListTypes from './constants';

export function getListData(url, query) {
  return {
    type: ExtraAwesomeListTypes.GET_LIST_DATA,
    payload: {
      url,
      query
    }
  };
}

export function receiveListData(data) {
  return {
    type: ExtraAwesomeListTypes.LIST_DATA_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelListData(message) {
  return {
    type: ExtraAwesomeListTypes.LIST_DATA_CANCELED,
    payload: {
      message
    }
  };
}

export function receiveUpdateListData(data) {
  return {
    type: ExtraAwesomeListTypes.UPDATE_LIST_DATA,
    payload: {
      data
    }
  };
}

export function clearListData() {
  return {
    type: ExtraAwesomeListTypes.CLEAR_LIST_DATA
  };
}
