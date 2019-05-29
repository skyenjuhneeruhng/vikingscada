import * as ResetPasswordTypes from './constants';

export function requestEmail(email) {
  return {
    type: ResetPasswordTypes.REQUEST_FORGOT_EMAIL,
    payload: {
      email
    }
  };
}

export function receiveResetPassword() {
  return {
    type: ResetPasswordTypes.FORGOT_EMAIL_RECEIVED
  };
}

export function sendResetPassword(data) {
  return {
    type: ResetPasswordTypes.SEND_RESET_PASSWORD,
    payload: {
      data
    }
  };
}

export function confirmResetPassword() {
  return {
    type: ResetPasswordTypes.RESET_PASSWORD_RECEIVED
  };
}

export function cancelResetPassword(message) {
  return {
    type: ResetPasswordTypes.FORGOT_EMAIL_CANCELED,
    payload: {
      message
    }
  };
}
