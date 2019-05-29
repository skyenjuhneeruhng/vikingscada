import shortid from 'shortid';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from './constants';

export function addNotification(message) {
  return {
    type: ADD_NOTIFICATION,
    message,
    id: shortid.generate()
  };
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id
  };
}
