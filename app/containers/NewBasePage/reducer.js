import * as AddNewTypes from './constants';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AddNewTypes.VIEW_ENTITY_RECEIVED:
    case AddNewTypes.UPDATE_ENTITY_RECEIVED:
      return action.payload.data;
    default:
      return state;
  }
};
