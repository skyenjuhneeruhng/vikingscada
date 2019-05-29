import * as DevicesListTypes from './constants';

export function getDevicesList(url, query) {
  return {
    type: DevicesListTypes.GET_DEVICES_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveDevicesList(data) {
  return {
    type: DevicesListTypes.DEVICES_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelDevicesList(message) {
  return {
    type: DevicesListTypes.DEVICES_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearDevicesList() {
  return {
    type: DevicesListTypes.CLEAR_DEVICES_LIST
  };
}


export function addDevice(url, data, root = false) {
  return {
    type: DevicesListTypes.ADD_NEW_DEVICE,
    payload: {
      url,
      data,
      root
    }
  };
}

export function receiveNewDevice(data, url) {
  return {
    type: DevicesListTypes.NEW_DEVICE_RECEIVED,
    payload: {
      data,
      url
    }
  };
}

export function deleteDevice(url, id, siteId) {
  return {
    type: DevicesListTypes.DELETE_DEVICE,
    payload: {
      url,
      id,
      siteId
    }
  };
}

export function receiveDeleteDevice(id, url) {
  return {
    type: DevicesListTypes.DELETE_DEVICE_RECEIVED,
    payload: {
      id,
      url
    }
  };
}

export function editDevice(url, id, data, root = false) {
  return {
    type: DevicesListTypes.EDIT_DEVICE,
    payload: {
      url,
      id,
      data,
      root
    }
  };
}

export function receiveEditDevice(id, data, url) {
  return {
    type: DevicesListTypes.EDIT_DEVICE_RECEIVED,
    payload: {
      id,
      data,
      url
    }
  };
}
