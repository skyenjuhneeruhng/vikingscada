import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ResetPassword from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>ResetPassword --- Render ResetPassword container (Mount + wrapping in <Provider>)',()=>{
  let resetPassword = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      resetPassword = mount(
        <Provider store={store}>
          <Router>
            <ResetPassword />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(resetPassword.length).toEqual(1)
  });


});