import * as DashboardsListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DashboardsListTypes.DASHBOARDS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case DashboardsListTypes.EDIT_DASHBOARD_RECEIVED: {
      const { id, data } = action.payload || '';
      return {
        ...state,
        list: state.list && state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    case DashboardsListTypes.NEW_DASHBOARD_RECEIVED: {
      const { data } = action.payload;
      return {
        ...state,
        total: state.total + 1,
        list: [data, ...state.list]
      };
    }
    case DashboardsListTypes.DELETE_DASHBOARD_RECEIVED: {
      const { id } = action.payload;
      return {
        ...state,
        total: state.total - 1,
        list: state.list.filter((item) => item.id !== id)
      };
    }
    case DashboardsListTypes.CLEAR_DASHBOARDS_LIST:
      return initialState;
    default:
      return state;
  }
};
