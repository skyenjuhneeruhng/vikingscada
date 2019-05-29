import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NewBase from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';


describe('>>>NewBase --- Render NewBase container (Mount + wrapping in <Provider>)',()=>{
  let newBase = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      newBase = mount(
        <Provider store={store}>
          <Router>
            <NewBase />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(newBase.length).toEqual(1)
  });


});