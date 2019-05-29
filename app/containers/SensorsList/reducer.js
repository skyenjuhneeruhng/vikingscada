import * as SensorsListTypes from './constants';

const initialState = {
  list: [],
  total: -1,
  _limit: 10,
  _start: 0,
  _sort: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SensorsListTypes.SENSORS_LIST_RECEIVED:
      return { ...state, ...action.payload.data };
    case SensorsListTypes.EDIT_SENSOR_RECEIVED: {
      const { id, data } = action.payload;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    case SensorsListTypes.NEW_SENSOR_RECEIVED: {
      const { data } = action.payload;
      return {
        ...state,
        total: state.total + 1,
        list: [data, ...state.list]
      };
    }
    case SensorsListTypes.DELETE_SENSOR_RECEIVED: {
      const { id } = action.payload;
      return {
        ...state,
        total: state.total - 1,
        list: state.list.filter((item) => item.id !== id)
      };
    }
    case SensorsListTypes.CLEAR_SENSORS_LIST:
      return initialState;
    default:
      return state;
  }
};
