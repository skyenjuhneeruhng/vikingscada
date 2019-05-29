import axios from 'axios';
import Cookies from 'js-cookie';

import { TOKEN_TIME } from './../../config';

import * as SignInTypes from './constants';
import * as SignUpTypes from './../SignUp/constants';

const initialState = Cookies.get('BRJWT') || false;

if (initialState) {
  axios.defaults.headers.common.Authorization = `${initialState}`;
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SignInTypes.USER_LOGOUT: {
      Cookies.remove('BRJWT');
      delete axios.defaults.headers.common.Authorization;
      return false;
    }
    case SignInTypes.SIGN_IN_RECEIVED:
    case SignUpTypes.SIGN_UP_RECEIVED: {
      const token = `Bearer ${action.payload.data.jwt}`;

      Cookies.remove('BRJWT');

      if (action.payload.remember) {
        const d = new Date();
        d.setTime(d.getTime() + (TOKEN_TIME * 1000));
        Cookies.set('BRJWT', token, {
          expires: d
        });
      } else {
        Cookies.set('BRJWT', token);
      }

      axios.defaults.headers.common.Authorization = token;
      return token;
    }
    default:
      return state;
  }
};
