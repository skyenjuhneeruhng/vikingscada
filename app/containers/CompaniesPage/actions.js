import * as CompaniesTypes from './constants';

export function getCompanies(query) {
  return {
    type: CompaniesTypes.GET_COMPANIES,
    payload: {
      query
    }
  };
}

export function receiveCompanies(data) {
  return {
    type: CompaniesTypes.COMPANIES_RECEIVED,
    payload: {
      data
    }
  };
}

export function cancelCompanies(message) {
  return {
    type: CompaniesTypes.COMPANIES_CANCELED,
    payload: {
      message
    }
  };
}
