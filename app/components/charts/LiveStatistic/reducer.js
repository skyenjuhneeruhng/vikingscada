import * as StatisticTypes from './constants';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case StatisticTypes.STATISTIC_RECEIVED:
      return {
        ...state,
        [action.payload.id]: action.payload.data
      };
    default:
      return state;
  }
};
