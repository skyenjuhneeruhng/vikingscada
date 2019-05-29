import * as ProfileTypes from './constants';


export default (state = 0, action = {}) => {
  switch (action.type) {
    case ProfileTypes.PENDING_COUNT_RECEIVED:
      return action.payload.total;
    default:
      return state;
  }
};
