import * as ProfileTypes from './constants';

export function getProfile() {
  return {
    type: ProfileTypes.GET_PROFILE
  };
}

export function receiveProfile(data) {
  return {
    type: ProfileTypes.PROFILE_RECEIVED,
    payload: {
      data
    }
  };
}

export function updateProfile(id, data, updateCurrent = true) {
  return {
    type: ProfileTypes.UPDATE_PROFILE,
    payload: {
      id, data, updateCurrent
    }
  };
}

export function updateMe(id, data) {
  return {
    type: ProfileTypes.UPDATE_ME,
    payload: {
      id, data
    }
  };
}

export function receiveUpdateProfile(data) {
  return {
    type: ProfileTypes.UPDATE_PROFILE_RECEIVED,
    payload: {
      data
    }
  };
}

export function receiveUpdateUserProfile() {
  return {
    type: ProfileTypes.UPDATE_USER_PROFILE_RECEIVED
  };
}

export function cancelProfile(message) {
  return {
    type: ProfileTypes.PROFILE_CANCELED,
    payload: {
      message
    }
  };
}

export function getPendingCount() {
  return {
    type: ProfileTypes.GET_PENDING_COUNT
  };
}

export function receivePendingCount(total) {
  return {
    type: ProfileTypes.PENDING_COUNT_RECEIVED,
    payload: {
      total
    }
  };
}
