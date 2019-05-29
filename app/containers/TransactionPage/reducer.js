import * as PlansListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PlansListTypes.TRANSACTIONS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case PlansListTypes.CLEAR_TRANSACTIONS_LIST:
      return initialState;
    default:
      return state;
  }
};
