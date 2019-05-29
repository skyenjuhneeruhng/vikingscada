import * as ConfirmTypes from './constants';

export function confirmMessages(url, code) {
  return {
    type: ConfirmTypes.CONFIRM_MESSAGES,
    payload: {
      url,
      code
    }
  };
}

export function receiveConfirmMessages(data) {
  return {
    type: ConfirmTypes.CONFIRM_MESSAGES_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelConfirmMessages(message) {
  return {
    type: ConfirmTypes.CONFIRM_MESSAGES_CANCELED,
    payload: {
      message
    }
  };
}
