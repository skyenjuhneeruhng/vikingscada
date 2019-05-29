import * as DevicesListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DevicesListTypes.DEVICES_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case DevicesListTypes.EDIT_DEVICE_RECEIVED: {
      const { id, data } = action.payload;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    case DevicesListTypes.NEW_DEVICE_RECEIVED: {
      const { data } = action.payload;
      return {
        ...state,
        total: state.total + 1,
        list: [data, ...state.list]
      };
    }
    case DevicesListTypes.DELETE_DEVICE_RECEIVED: {
      const { id } = action.payload;
      return {
        ...state,
        total: state.total - 1,
        list: state.list.filter((item) => item.id !== id)
      };
    }
    case DevicesListTypes.CLEAR_DEVICES_LIST:
      return initialState;
    default:
      return state;
  }
};
