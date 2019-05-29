import * as InvoiceTypes from './constants';


export function getInvoiceById(id) {
  return {
    type: InvoiceTypes.GET_INVOICE,
    payload: {
      id
    }
  };
}

export function receiveInvoiceById(data) {
  return {
    type: InvoiceTypes.GET_INVOICE_RECEIVED,
    payload: {
      data
    }
  };
}


export function cancelInvoiceById(data) {
  return {
    type: InvoiceTypes.GET_INVOICE_CANCELED,
    payload: {
      data
    }
  };
}
