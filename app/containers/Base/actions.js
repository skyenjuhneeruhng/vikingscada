import * as BaseTypes from './constants';

export function savePrevUrl(url) {
  return {
    type: BaseTypes.PREV_URL,
    payload: {
      url
    }
  };
}
