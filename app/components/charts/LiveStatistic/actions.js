import * as StatisticTypes from './constants';

export function getStatistic(id, sensorId, from, to) {
  return {
    type: StatisticTypes.GET_STATISTIC,
    payload: {
      id,
      sensorId,
      from,
      to
    }
  };
}

export function receiveStatistic(id, data) {
  return {
    type: StatisticTypes.STATISTIC_RECEIVED,
    payload: {
      id,
      data
    }
  };
}

export function cancelStatistic(message) {
  return {
    type: StatisticTypes.STATISTIC_CANCEL,
    payload: {
      message
    }
  };
}
