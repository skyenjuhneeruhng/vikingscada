import * as PlansListTypes from './constants';

const initialState = {
  tryingToSubscribe: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PlansListTypes.SUBSCRIBED:
      return {
        ...state,
        tryingToSubscribe: true
      };
    case PlansListTypes.SUBSCRIBED_RECEIVED:
      return {
        ...state,
        tryingToSubscribe: false
      };
    case PlansListTypes.PAYMENTS_LIST_RECEIVED:
      return {
        ...state,
        list: action.payload.data
      };
    case PlansListTypes.PUBLIC_KEY_RECEIVED:
      return {
        ...state,
        key: action.payload.data
      };
    case PlansListTypes.CLEAR_PAYMENTS_LIST:
      return initialState;
    default:
      return state;
  }
};
