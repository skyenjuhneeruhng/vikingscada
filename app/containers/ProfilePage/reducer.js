import * as SignInTypes from './../SignIn/constants';
import * as SignUpTypes from './../SignUp/constants';
import * as VerifyTypes from './../Verify/constants';
import * as ProfileTypes from './constants';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SignInTypes.SIGN_IN_RECEIVED:
    case SignUpTypes.SIGN_UP_RECEIVED:
      return action.payload.data.user;
    case ProfileTypes.PROFILE_RECEIVED:
    case ProfileTypes.UPDATE_PROFILE_RECEIVED:
      return action.payload.data;
    case VerifyTypes.VERIFY_RECEIVED:
      return { ...state, verified: true };
    default:
      return state;
  }
};
