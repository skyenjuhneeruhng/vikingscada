import { findIndex } from 'lodash';

import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from './constants';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return [
        ...state,
        {
          id: action.id,
          type: action.message.type,
          text: action.message.text
        }
      ];
    }
    case DELETE_NOTIFICATION: {
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;
    }
    default:
      return state;
  }
};
