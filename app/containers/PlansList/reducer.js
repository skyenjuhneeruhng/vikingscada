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
    case PlansListTypes.PLANS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case PlansListTypes.EDIT_PLAN_RECEIVED: {
      const { id, data } = action.payload;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    case PlansListTypes.NEW_PLAN_RECEIVED: {
      const { data } = action.payload;
      return {
        ...state,
        total: state.total + 1,
        list: [data, ...state.list]
      };
    }
    case PlansListTypes.DELETE_PLAN_RECEIVED: {
      const { id } = action.payload;
      return {
        ...state,
        total: state.total - 1,
        list: state.list.filter((item) => item.id !== id)
      };
    }
    case PlansListTypes.CLEAR_PLANS_LIST:
      return initialState;
    default:
      return state;
  }
};
