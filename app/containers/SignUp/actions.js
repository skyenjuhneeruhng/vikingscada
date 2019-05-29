import * as SignUpTypes from './constants';

export function signUp(data) {
  return {
    type: SignUpTypes.SIGN_UP,
    payload: {
      data
    }
  };
}

export function receiveSignUp(data) {
  return {
    type: SignUpTypes.SIGN_UP_RECEIVED,
    payload: {
      data
    }
  };
}

export function signUpWithoutVer(data) {
  return {
    type: SignUpTypes.SIGN_UP_WITHOUT_VER,
    payload: {
      data
    }
  };
}

export function receiveSignUpWithoutVer(data) {
  return {
    type: SignUpTypes.SIGN_UP_WITHOUT_VER_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelSignUp(message) {
  return {
    type: SignUpTypes.SIGN_UP_CANCELED,
    payload: {
      message
    }
  };
}
