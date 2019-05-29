import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Companies from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>Companies --- Renders Companies message to user (Mount + wrapping in <Provider>)',()=>{
  let companies = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      companies = mount(
        <Provider store={store}>
          <Router>
            <Companies />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(companies.length).toEqual(1)
  });


});