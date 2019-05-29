import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ExtraAwesomeList from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>ExtraAwesomeList --- Renders ExtraAwesomeList message to user (Mount + wrapping in <Provider>)',()=>{
  let extraAwesomeList = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      extraAwesomeList = mount(
        <Provider store={store}>
          <Router>
            <ExtraAwesomeList />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(extraAwesomeList.length).toEqual(1)
  });


});