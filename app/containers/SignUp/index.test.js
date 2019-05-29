import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SignUp from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>SignUp --- Render SignUp container (Mount + wrapping in <Provider>)',()=>{
  let signUp = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      signUp = mount(
        <Provider store={store}>
          <Router>
            <SignUp />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(signUp.length).toEqual(1)
  });


});