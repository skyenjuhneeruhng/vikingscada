import * as SignInTypes from './constants';

export function signIn(data) {
  return {
    type: SignInTypes.SIGN_IN,
    payload: {
      data
    }
  };
}

export function receiveSignIn(data, remember) {
  return {
    type: SignInTypes.SIGN_IN_RECEIVED,
    payload: {
      data,
      remember
    }
  };
}

export function cancelSignIn(message) {
  return {
    type: SignInTypes.SIGN_IN_CANCELED,
    payload: {
      message
    }
  };
}

export function logout() {
  return {
    type: SignInTypes.USER_LOGOUT
  };
}
