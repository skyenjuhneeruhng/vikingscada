import * as PurchaseTypes from './constants';

export function getPaymentsList(url, query) {
  return {
    type: PurchaseTypes.GET_PAYMENTS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receivePaymentsList(data) {
  return {
    type: PurchaseTypes.PAYMENTS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelPaymentsList(message) {
  return {
    type: PurchaseTypes.PAYMENTS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearPaymentsList() {
  return {
    type: PurchaseTypes.CLEAR_PAYMENTS_LIST
  };
}

export function getPublicKey() {
  return {
    type: PurchaseTypes.GET_PUBLIC_KEY
  };
}

export function Subscribed(url, data, correctEmail) {
  return {
    type: PurchaseTypes.SUBSCRIBED,
    payload: {
      url,
      data,
      correctEmail
    }
  };
}

export function receiveSubscribed(data) {
  return {
    type: PurchaseTypes.SUBSCRIBED_RECEIVED,
    payload: {
      data
    }
  };
}

export function receivePublicKey(data) {
  return {
    type: PurchaseTypes.PUBLIC_KEY_RECEIVED,
    payload: {
      data
    }
  };
}

export function unSubscribed() {
  return {
    type: PurchaseTypes.UN_SUBSCRIBED
  };
}

export function receiveUnSubscribed(data) {
  return {
    type: PurchaseTypes.UN_SUBSCRIBED_RECEIVED,
    payload: {
      data
    }
  };
}

