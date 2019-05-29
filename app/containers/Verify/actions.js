import * as VerifyTypes from './constants';

export function sendVerifySMS() {
  return {
    type: VerifyTypes.SEND_VERIFY_SMS
  };
}

export function verifySMSsent() {
  return {
    type: VerifyTypes.VERIFY_SMS_SENT
  };
}

export function verify(code) {
  return {
    type: VerifyTypes.VERIFY,
    payload: {
      code
    }
  };
}

export function receiveVerify() {
  return {
    type: VerifyTypes.VERIFY_RECEIVED
  };
}

export function cancelVerify(message) {
  return {
    type: VerifyTypes.VERIFY_CANCELED,
    payload: {
      message
    }
  };
}
