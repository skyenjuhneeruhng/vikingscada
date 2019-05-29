import * as ConfirmTypes from './constants';

const initialState = {
  loading: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ConfirmTypes.CONFIRM_MESSAGES_RECEIVED:
      return { ...action.payload.data, loading: true };
    default:
      return state;
  }
};
