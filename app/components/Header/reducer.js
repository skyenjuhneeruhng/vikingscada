import * as traffic from './constants';

const initialState = false;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case traffic.TRAFFIC: {
      return {
        count: action.payload.data,
        stream: true
      };
    }
    case traffic.GET_TRAFFIC_RECEIVED: {
      return {
        count: action.payload.data,
        stream: false
      };
    }
    case traffic.CLEAR_TRAFFIC: {
      return {
        count: 0,
        stream: false
      };
    }
    default:
      return state;
  }
};
