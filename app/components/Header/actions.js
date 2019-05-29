import * as traffic from './constants';

export function updateTraffic(data) {
  return {
    type: traffic.TRAFFIC,
    payload: {
      data
    }
  };
}

export function getTraffic() {
  return {
    type: traffic.GET_TRAFFIC
  };
}

export function receiveTraffic(data) {
  return {
    type: traffic.GET_TRAFFIC_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelTraffic(data) {
  return {
    type: traffic.GET_TRAFFIC_CANCELED,
    payload: {
      data
    }
  };
}

export function clearTraffic() {
  return {
    type: traffic.CLEAR_TRAFFIC
  };
}
