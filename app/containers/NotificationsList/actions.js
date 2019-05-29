import * as NotificationsTypes from './constants';

export function getNotificationsList(type) {
  return {
    type: NotificationsTypes.GET_NOTIFICATIONS_LIST,
    payload: {
      type
    }
  };
}

export function getNotificationsListSuccess(data) {
  return {
    type: NotificationsTypes.GET_NOTIFICATIONS_LIST_SUCCESS,
    payload: {
      data
    }
  };
}

export function getNotificationsListCanceled(data) {
  return {
    type: NotificationsTypes.GET_NOTIFICATIONS_LIST_CANCELED,
    payload: {
      data
    }
  };
}

export function updateNotifications(type, id, action) {
  return {
    type: NotificationsTypes.UPDATE_NOTIFICATIONS,
    payload: {
      type,
      id,
      action
    }
  };
}

export function updateNotificationsSuccess(data) {
  return {
    type: NotificationsTypes.UPDATE_NOTIFICATIONS_SUCCESS,
    payload: {
      data
    }
  };
}
