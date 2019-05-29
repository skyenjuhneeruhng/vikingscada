import * as ViewCompanyTypes from './constants';

export function getCompanyById(id) {
  return {
    type: ViewCompanyTypes.VIEW_COMPANY,
    payload: {
      id
    }
  };
}

export function receiveCompany(data) {
  return {
    type: ViewCompanyTypes.VIEW_COMPANY_RECEIVED,
    payload: {
      data
    }
  };
}

export function updateCompanyById(id, company) {
  return {
    type: ViewCompanyTypes.UPDATE_COMPANY,
    payload: {
      id,
      company
    }
  };
}

export function receiveUpdateCompany(data) {
  return {
    type: ViewCompanyTypes.UPDATE_COMPANY_RECEIVED,
    payload: {
      data
    }
  };
}

export function updateCompanyStatusById(id, company) {
  return {
    type: ViewCompanyTypes.UPDATE_COMPANY_STATUS,
    payload: {
      id,
      company
    }
  };
}

export function receiveUpdateCompanyStatus(data) {
  return {
    type: ViewCompanyTypes.UPDATE_COMPANY_STATUS_RECEIVED,
    payload: {
      data
    }
  };
}

export function deleteCompanyById(id, redirect = '/companies') {
  return {
    type: ViewCompanyTypes.DELETE_COMPANY,
    payload: {
      id,
      redirect
    }
  };
}

export function receiveDeleteCompany(data, redirect) {
  return {
    type: ViewCompanyTypes.DELETE_COMPANY_RECEIVED,
    payload: {
      data,
      redirect
    }
  };
}

export function companyError(message) {
  return {
    type: ViewCompanyTypes.COMPANY_ERROR,
    payload: {
      message
    }
  };
}

export function changeDefaultIndex(index) {
  return {
    type: ViewCompanyTypes.DEFAULT_INDEX,
    payload: {
      index
    }
  };
}
