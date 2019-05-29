import * as InvoiceTypes from './constants';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case InvoiceTypes.GET_INVOICE_RECEIVED:
      return action.payload.data;
    default:
      return state;
  }
};
