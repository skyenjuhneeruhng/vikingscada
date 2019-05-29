import * as AddNewTypes from './constants';

export function addNewEntity(data, type, redirect) {
  return {
    type: AddNewTypes.ADD_NEW_ENTITY,
    payload: {
      data,
      type,
      redirect
    }
  };
}

export function receiveAddNewEntity(data, redirect) {
  return {
    type: AddNewTypes.ADD_NEW_ENTITY_RECEIVED,
    payload: {
      data,
      redirect
    }
  };
}

export function getEntityById(id, entity) {
  return {
    type: AddNewTypes.VIEW_ENTITY,
    payload: {
      id,
      entity
    }
  };
}

export function receiveEntity(data) {
  return {
    type: AddNewTypes.VIEW_ENTITY_RECEIVED,
    payload: {
      data
    }
  };
}

export function updateEntityById(id, site, entity, redirect) {
  return {
    type: AddNewTypes.UPDATE_ENTITY,
    payload: {
      id,
      site,
      entity,
      redirect
    }
  };
}

export function receiveUpdateEntity(data, redirect) {
  return {
    type: AddNewTypes.UPDATE_ENTITY_RECEIVED,
    payload: {
      data,
      redirect
    }
  };
}

export function deleteEntityById(id, entity, redirect) {
  return {
    type: AddNewTypes.DELETE_ENTITY,
    payload: {
      id,
      entity,
      redirect
    }
  };
}

export function receiveDeleteEntity(data, redirect) {
  return {
    type: AddNewTypes.DELETE_ENTITY_RECEIVED,
    payload: {
      data,
      redirect
    }
  };
}

export function cancelAddNew(message) {
  return {
    type: AddNewTypes.ADD_NEW_ENTITY_CANCELED,
    payload: {
      message
    }
  };
}
