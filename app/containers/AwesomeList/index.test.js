import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AwesomeList from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>AwesomeList --- Renders AwesomeList message to user (Mount + wrapping in <Provider>)',()=>{
  let awesomeList = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      awesomeList = mount(
        <Provider store={store}>
          <Router>
            <AwesomeList />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(awesomeList.length).toEqual(1)
  });


});