import { getCompanies, receiveCompanies, cancelCompanies } from './actions'

describe('>>>A C T I O N --- Test Companies', ()=> {
    it('+++ action getCompanies', () => {
        const query = {};
        const get = getCompanies(query);
        expect(get).toEqual({ type: 'GET_COMPANIES', 'payload': {'query': query}})
    });

    it('+++ action receiveCompanies', () => {
      const data = {};
      const receive = receiveCompanies(data);
      expect(receive).toEqual({ type: 'COMPANIES_RECEIVED', 'payload': {'data': data}})
    });

    it('+++ action cancelCompanies', () => {
      const message = 'Success!';
      const cancel = cancelCompanies(message);
      expect(cancel).toEqual({ type: 'COMPANIES_CANCELED', 'payload': {'message': message}})
    });
});