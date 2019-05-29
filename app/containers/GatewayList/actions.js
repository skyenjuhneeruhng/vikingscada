import * as GatewaysListTypes from './constants';

export function getGatewaysList(url, query) {
  return {
    type: GatewaysListTypes.GET_GATEWAYS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveGatewaysList(data) {
  return {
    type: GatewaysListTypes.GATEWAYS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelGatewaysList(message) {
  return {
    type: GatewaysListTypes.GATEWAYS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearGatewaysList() {
  return {
    type: GatewaysListTypes.CLEAR_GATEWAYS_LIST
  };
}


export function addGateway(url, data, root = false) {
  return {
    type: GatewaysListTypes.ADD_NEW_GATEWAY,
    payload: {
      url,
      data,
      root
    }
  };
}

export function receiveNewGateway(data, url) {
  return {
    type: GatewaysListTypes.NEW_GATEWAY_RECEIVED,
    payload: {
      data,
      url
    }
  };
}

export function deleteGateway(url, id, siteId) {
  return {
    type: GatewaysListTypes.DELETE_GATEWAY,
    payload: {
      url,
      id,
      siteId
    }
  };
}

export function receiveDeleteGateway(id, url) {
  return {
    type: GatewaysListTypes.DELETE_GATEWAY_RECEIVED,
    payload: {
      id,
      url
    }
  };
}

export function editGateway(url, id, data, root = false) {
  return {
    type: GatewaysListTypes.EDIT_GATEWAY,
    payload: {
      url,
      id,
      data,
      root
    }
  };
}

export function receiveEditGateway(id, data, url) {
  return {
    type: GatewaysListTypes.EDIT_GATEWAY_RECEIVED,
    payload: {
      id,
      data,
      url
    }
  };
}
