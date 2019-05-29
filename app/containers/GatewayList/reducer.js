import * as GatewaysListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GatewaysListTypes.GATEWAYS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case GatewaysListTypes.EDIT_GATEWAY_RECEIVED: {
      const { id, data } = action.payload;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    case GatewaysListTypes.NEW_GATEWAY_RECEIVED: {
      const { data } = action.payload;
      return {
        ...state,
        total: state.total + 1,
        list: [data, ...state.list]
      };
    }
    case GatewaysListTypes.DELETE_GATEWAY_RECEIVED: {
      const { id } = action.payload;
      return {
        ...state,
        total: state.total - 1,
        list: state.list.filter((item) => item.id !== id)
      };
    }
    case GatewaysListTypes.CLEAR_GATEWAYS_LIST:
      return initialState;
    default:
      return state;
  }
};
