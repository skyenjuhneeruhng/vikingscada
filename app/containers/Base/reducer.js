import * as BaseTypes from './constants';
import * as SignInTypes from '../SignIn/constants';

export default (state = '/', action = {}) => {
  switch (action.type) {
    case BaseTypes.PREV_URL:
      return action.payload.url || '/';
    case SignInTypes.USER_LOGOUT:
      return '/';
    default:
      return state;
  }
};
