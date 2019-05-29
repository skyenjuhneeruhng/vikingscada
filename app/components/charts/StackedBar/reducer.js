import * as StatisticTypes from './constants';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case StatisticTypes.BAR_STATISTIC_RECEIVED: {
      const { data } = action.payload;
      const formatedData = Object.keys(data).map((date) => ({
        date,
        data: data[date],
        value: 1
      }));

      return {
        ...state,
        [action.payload.id]: formatedData
      };
    }
    case StatisticTypes.BAR_STATISTIC_CLEAR:
      return { ...state, [action.payload.id]: [] };
    default:
      return state;
  }
};
