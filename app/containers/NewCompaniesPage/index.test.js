import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NewCompanies from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>NewCompanies --- Render NewCompanies container (Mount + wrapping in <Provider>)',()=>{
  let newCompanies = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      newCompanies = mount(
        <Provider store={store}>
          <Router>
            <NewCompanies />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(newCompanies.length).toEqual(1)
  });


});