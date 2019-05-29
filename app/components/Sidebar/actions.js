import * as SidebarTypes from './constants';

export function toggleSidebar(status) {
  return {
    type: SidebarTypes.TOGGLE_SIDEBAR,
    payload: {
      status
    }
  };
}
