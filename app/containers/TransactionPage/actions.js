import * as TransactionTypes from './constants';

export function getTransactionsList(url, query) {
  return {
    type: TransactionTypes.GET_TRANSACTIONS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveTransactionsList(data) {
  return {
    type: TransactionTypes.TRANSACTIONS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelTransactionsList(message) {
  return {
    type: TransactionTypes.TRANSACTIONS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearTransactionsList() {
  return {
    type: TransactionTypes.CLEAR_TRANSACTIONS_LIST
  };
}
