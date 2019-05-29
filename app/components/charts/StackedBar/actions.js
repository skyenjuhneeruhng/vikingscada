import * as StatisticTypes from './constants';

export function getStatistic(id, sensorId, date) {
  return {
    type: StatisticTypes.GET_BAR_STATISTIC,
    payload: {
      id,
      sensorId,
      date
    }
  };
}

export function receiveStatistic(id, date, data) {
  return {
    type: StatisticTypes.BAR_STATISTIC_RECEIVED,
    payload: {
      id,
      date,
      data
    }
  };
}

export function cancelStatistic(message) {
  return {
    type: StatisticTypes.BAR_STATISTIC_CANCEL,
    payload: {
      message
    }
  };
}

export function clearStatistic(id) {
  return {
    type: StatisticTypes.BAR_STATISTIC_CLEAR,
    payload: {
      id
    }
  };
}
