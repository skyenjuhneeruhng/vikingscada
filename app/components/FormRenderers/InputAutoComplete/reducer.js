import * as EntitiesTypes from './constants';

const initialState = {
  list: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case EntitiesTypes.ENTITIES_RECEIVED:
      return {
        ...state,
        ...action.payload.data,
        avaliable: null
      };
    case EntitiesTypes.AVALIABLE_SENSOR_RECEIVED: {
      return {
        ...state,
        avaliable: action.payload.data && action.payload.data.avaliable
      };
    }
    case EntitiesTypes.CLEAN_ENTITIES:
      return initialState;
    default:
      return state;
  }
};
