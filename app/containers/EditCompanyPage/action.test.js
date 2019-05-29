import { getCompanyById, receiveCompany, updateCompanyById,
  receiveUpdateCompany, updateCompanyStatusById, receiveUpdateCompanyStatus,
  deleteCompanyById, receiveDeleteCompany, companyError, changeDefaultIndex} from './actions'

describe('>>>A C T I O N --- Test EditCompany', ()=> {
    it('+++ action getCompanyById', () => {
        const id = 'companyId';
        const getCompany = getCompanyById(id);
        expect(getCompany).toEqual({ type: 'VIEW_COMPANY', 'payload': {'id': id}})
    });

    it('+++ action receiveCompany', () => {
      const data = {};
      const receive = receiveCompany(data);
      expect(receive).toEqual({ type: 'VIEW_COMPANY_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action updateCompanyById', () => {
      const id = 'companyId';
      const company = {name: 'New company'};
      const update = updateCompanyById(id, company);
      expect(update).toEqual({ type: 'UPDATE_COMPANY', 'payload': {'id': id, 'company': company}})
    });

    it('+++ action receiveUpdateCompany', () => {
      const data = {name: 'New company'};
      const recive = receiveUpdateCompany(data);
      expect(recive).toEqual({ type: 'UPDATE_COMPANY_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action updateCompanyStatusById', () => {
      const id = 'companyId';
      const company = {name: 'New company'};
      const update = updateCompanyStatusById(id, company);
      expect(update).toEqual({ type: 'UPDATE_COMPANY_STATUS', 'payload': {'id': id, 'company': company}})
    });

    it('+++ action receiveUpdateCompanyStatus', () => {
      const data = {name: 'New company'};
      const receive = receiveUpdateCompanyStatus(data);
      expect(receive).toEqual({ type: 'UPDATE_COMPANY_STATUS_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action deleteCompanyById', () => {
      const id = 'companyId';
      const redirect = '/companies';
      const del = deleteCompanyById(id, redirect);
      expect(del).toEqual({ type: 'DELETE_COMPANY', 'payload': {'id': id, 'redirect': redirect}})
    });

    it('+++ action receiveDeleteCompany', () => {
      const data = {name: 'New company'};
      const redirect = '/companies';
      const receive = receiveDeleteCompany(data, redirect);
      expect(receive).toEqual({ type: 'DELETE_COMPANY_RECEIVED', 'payload': {'data': data, 'redirect': redirect }})
    });

    it('+++ action companyError', () => {
      const message = 'Error!';
      const error = companyError(message);
      expect(error).toEqual({ type: 'COMPANY_ERROR', 'payload': {'message': message}})
    });

    it('+++ action changeDefaultIndex', () => {
      const index = 0;
      const ind = changeDefaultIndex(index);
      expect(ind).toEqual({ type: 'DEFAULT_INDEX', 'payload': {'index': index}})
    });
});