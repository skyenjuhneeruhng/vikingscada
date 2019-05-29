import * as SidebarTypes from './constants';

export default (state = false, action = {}) => {
  switch (action.type) {
    case SidebarTypes.TOGGLE_SIDEBAR: {
      return action.payload.status;
    }
    default: {
      return state;
    }
  }
};
