import * as CompaniesTypes from './constants';
import * as ViewCompanyTypes from './../EditCompanyPage/constants';

const initialState = {
  list: [],
  waitingApproveList: [],
  total: 0,
  _limit: 10,
  _start: 0,
  _sort: 'updatedAt:desc'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CompaniesTypes.COMPANIES_RECEIVED:
      return { ...state, ...action.payload.data };
    case ViewCompanyTypes.UPDATE_COMPANY_RECEIVED: {
      const { id, ...data } = action.payload.data;
      return {
        ...state,
        list: state.list.map((item) => (
          id === item.id ? { ...item, ...data } : item
        ))
      };
    }
    default:
      return state;
  }
};
