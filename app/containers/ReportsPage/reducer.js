import * as ReportsTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: '',
  loading: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ReportsTypes.REPORTS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case ReportsTypes.DOWNLOAD_REPORTS_LIST:
      return { ...state, loading: true };
    case ReportsTypes.DOWNLOAD_REPORTS_LIST_RECEIVED:
      return { ...state, loading: false };
    case ReportsTypes.CLEAR_REPORTS_LIST:
      return initialState;
    default:
      return state;
  }
};
