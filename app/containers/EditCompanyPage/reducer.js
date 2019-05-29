// import * as SignInTypes from './../SignInPage/constants';
// import * as SignUpTypes from './../SignUpPage/constants';
import * as ViewCompanyTypes from './constants';

const initialState = {
  defaultIndex: 0,
  company: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ViewCompanyTypes.VIEW_COMPANY_RECEIVED:
    case ViewCompanyTypes.UPDATE_COMPANY_RECEIVED:
      return {
        ...state,
        company: action.payload.data
      };
    case ViewCompanyTypes.DEFAULT_INDEX:
      return {
        ...state,
        defaultIndex: action.payload.index
      };
    default: return state;
  }
};
