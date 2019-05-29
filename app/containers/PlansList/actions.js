import * as PlansListTypes from './constants';

export function getPlansList(url, query) {
  return {
    type: PlansListTypes.GET_PLANS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receivePlansList(data) {
  return {
    type: PlansListTypes.PLANS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelPlansList(message) {
  return {
    type: PlansListTypes.PLANS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearPlansList() {
  return {
    type: PlansListTypes.CLEAR_PLANS_LIST
  };
}


export function addPlan(url, data) {
  return {
    type: PlansListTypes.ADD_NEW_PLAN,
    payload: {
      url,
      data
    }
  };
}

export function receiveNewPlan(data, url) {
  return {
    type: PlansListTypes.NEW_PLAN_RECEIVED,
    payload: {
      data,
      url
    }
  };
}

export function deletePlan(url, id) {
  return {
    type: PlansListTypes.DELETE_PLAN,
    payload: {
      url,
      id
    }
  };
}

export function receiveDeletePlan(id, url) {
  return {
    type: PlansListTypes.DELETE_PLAN_RECEIVED,
    payload: {
      id,
      url
    }
  };
}

export function editPlan(url, id, data) {
  return {
    type: PlansListTypes.EDIT_PLAN,
    payload: {
      url,
      id,
      data
    }
  };
}

export function receiveEditPlan(id, data, url) {
  return {
    type: PlansListTypes.EDIT_PLAN_RECEIVED,
    payload: {
      id,
      data,
      url
    }
  };
}
