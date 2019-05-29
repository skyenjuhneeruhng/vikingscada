import * as EntitiesTypes from './constants';

export function getEntities(query, entity) {
  return {
    type: EntitiesTypes.GET_ENTITIES,
    payload: {
      query,
      entity
    }
  };
}

export function receiveEntities(data) {
  return {
    type: EntitiesTypes.ENTITIES_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelEntities(message) {
  return {
    type: EntitiesTypes.ENTITIES_CANCELED,
    payload: {
      message
    }
  };
}

export function cleanEntities() {
  return {
    type: EntitiesTypes.CLEAN_ENTITIES
  };
}

export function avaliableAlertForSensor(id) {
  return {
    type: EntitiesTypes.AVALIABLE_SENSOR,
    payload: {
      id
    }
  };
}


export function receiveAvaliableAlertForSensor(data) {
  return {
    type: EntitiesTypes.AVALIABLE_SENSOR_RECEIVED,
    payload: {
      data
    }
  };
}
