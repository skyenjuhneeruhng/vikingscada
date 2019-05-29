import * as DashboardTypes from './constants';

export function addWidget(data, id) {
  return {
    type: DashboardTypes.ADD_ITEM,
    payload: {
      data,
      id
    }
  };
}

export function getWidgetById(dashboardId, widgetId) {
  return {
    type: DashboardTypes.GET_WIDGET,
    payload: {
      dashboardId,
      widgetId
    }
  };
}

export function receiveAddWidget(data) {
  return {
    type: DashboardTypes.ADD_ITEM_RECEIVED,
    payload: {
      data
    }
  };
}

export function removeWidget(dashboardId, widgetId) {
  return {
    type: DashboardTypes.REMOVE_WIDGET,
    payload: {
      dashboardId,
      widgetId
    }
  };
}

export function cancelWidget() {
  return {
    type: DashboardTypes.CANCEL_WIDGET
  };
}

// export function updateWidget(ind, data) {
//   return {
//     type: DashboardTypes.UPDATE_WIDGET,
//     payload: {
//       ind,
//       data
//     }
//   };
// }

export function updateLayout(layouts) {
  return {
    type: DashboardTypes.UPDATE_LAYOUT,
    payload: {
      layouts
    }
  };
}

export function lockLayout(breakpoint, lock, url, data) {
  return {
    type: DashboardTypes.LOCK,
    payload: {
      breakpoint,
      lock,
      url,
      data
    }
  };
}

export function getDashboard(url) {
  return {
    type: DashboardTypes.GET_ONE_DASHBOARD,
    payload: {
      url
    }
  };
}

export function receiveDashboard(data) {
  return {
    type: DashboardTypes.ONE_DASHBOARD_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelDashboard(message) {
  return {
    type: DashboardTypes.ONE_DASHBOARD_CANCELED,
    payload: {
      message
    }
  };
}

export function saveDashboardSuccess(message, type) {
  return {
    type: DashboardTypes.SAVE_DASHBOARD_SUCCESS,
    payload: {
      message,
      type
    }
  };
}

export function cleanLayout() {
  return {
    type: DashboardTypes.CLEAN_LAYOUT
  };
}


export function addFullWidget(data, id) {
  return {
    type: DashboardTypes.ADD_WIDGET,
    payload: {
      data,
      id
    }
  };
}

export function receiveWidget(data) {
  return {
    type: DashboardTypes.ADD_WIDGET_RECEIVED,
    payload: {
      data
    }
  };
}

export function receiveWidgetById(data) {
  return {
    type: DashboardTypes.GET_WIDGET_RECEIVED,
    payload: {
      data
    }
  };
}


export function updateFullWidget(data, dashboardId, widgetId) {
  return {
    type: DashboardTypes.UPDATE_WIDGET,
    payload: {
      data,
      dashboardId,
      widgetId
    }
  };
}

export function receiveUpdateWidget(data, id) {
  return {
    type: DashboardTypes.UPDATE_WIDGET_RECEIVED,
    payload: {
      data,
      id
    }
  };
}


export function receiveDeleteWidget(id) {
  return {
    type: DashboardTypes.REMOVE_WIDGET_RECEIVED,
    payload: {
      id
    }
  };
}

export function toggleReles(sensorId, reles) {
  return {
    type: DashboardTypes.TOGGLE_RELES,
    payload: {
      sensorId,
      reles
    }
  };
}
