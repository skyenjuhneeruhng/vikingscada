import * as NotificationsTypes from './constants';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NotificationsTypes.GET_NOTIFICATIONS_LIST_SUCCESS:
      return action.payload.data;
    default: return state;
  }
};
