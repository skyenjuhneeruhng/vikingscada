import * as DashboardsListTypes from './constants';

export function getDashboardsList(url, query) {
  return {
    type: DashboardsListTypes.GET_DASHBOARDS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveDashboardsList(data) {
  return {
    type: DashboardsListTypes.DASHBOARDS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelDashboardsList(message) {
  return {
    type: DashboardsListTypes.DASHBOARDS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearDashboardsList() {
  return {
    type: DashboardsListTypes.CLEAR_DASHBOARDS_LIST
  };
}


export function addDashboard(url, data) {
  return {
    type: DashboardsListTypes.ADD_NEW_DASHBOARD,
    payload: {
      url,
      data
    }
  };
}

export function receiveNewDashboard(data) {
  return {
    type: DashboardsListTypes.NEW_DASHBOARD_RECEIVED,
    payload: {
      data
    }
  };
}

export function deleteDashboard(url, id) {
  return {
    type: DashboardsListTypes.DELETE_DASHBOARD,
    payload: {
      url,
      id
    }
  };
}

export function receiveDeleteDashboard(id) {
  return {
    type: DashboardsListTypes.DELETE_DASHBOARD_RECEIVED,
    payload: {
      id
    }
  };
}

export function editDashboard(url, id, data) {
  return {
    type: DashboardsListTypes.EDIT_DASHBOARD,
    payload: {
      url,
      id,
      data
    }
  };
}

export function receiveEditDashboard(id, data) {
  return {
    type: DashboardsListTypes.EDIT_DASHBOARD_RECEIVED,
    payload: {
      id,
      data
    }
  };
}
