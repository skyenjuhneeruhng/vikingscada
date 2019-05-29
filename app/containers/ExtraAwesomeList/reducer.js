import * as ExtraAwesomeListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: '',
  preloader: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ExtraAwesomeListTypes.GET_LIST_DATA:
      return { ...state, preloader: true };
    case ExtraAwesomeListTypes.LIST_DATA_RECEIVED:
      return { ...state, ...action.payload.data, preloader: false };
    case ExtraAwesomeListTypes.UPDATE_LIST_DATA: {
      const { id, ...data } = action.payload.data;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        )),
        preloader: false
      };
    }
    case ExtraAwesomeListTypes.CLEAR_LIST_DATA:
      return initialState;
    default:
      return state;
  }
};
