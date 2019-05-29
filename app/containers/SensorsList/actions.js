import * as SensorsListTypes from './constants';

export function getSensorsList(url, query) {
  return {
    type: SensorsListTypes.GET_SENSORS_LIST,
    payload: {
      url,
      query
    }
  };
}

export function receiveSensorsList(data) {
  return {
    type: SensorsListTypes.SENSORS_LIST_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelSensorsList(message) {
  return {
    type: SensorsListTypes.SENSORS_LIST_CANCELED,
    payload: {
      message
    }
  };
}

export function clearSensorsList() {
  return {
    type: SensorsListTypes.CLEAR_SENSORS_LIST
  };
}


export function addSensor(url, data, root = false) {
  return {
    type: SensorsListTypes.ADD_NEW_SENSOR,
    payload: {
      url,
      data,
      root
    }
  };
}

export function receiveNewSensor(data, url) {
  return {
    type: SensorsListTypes.NEW_SENSOR_RECEIVED,
    payload: {
      data,
      url
    }
  };
}

export function deleteSensor(url, id, siteId) {
  return {
    type: SensorsListTypes.DELETE_SENSOR,
    payload: {
      url,
      id,
      siteId
    }
  };
}

export function receiveDeleteSensor(id, url) {
  return {
    type: SensorsListTypes.DELETE_SENSOR_RECEIVED,
    payload: {
      id,
      url
    }
  };
}

export function editSensor(url, id, data, root = false) {
  return {
    type: SensorsListTypes.EDIT_SENSOR,
    payload: {
      url,
      id,
      data,
      root
    }
  };
}

export function receiveEditSensor(id, data, url) {
  return {
    type: SensorsListTypes.EDIT_SENSOR_RECEIVED,
    payload: {
      id,
      data,
      url
    }
  };
}

