import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DevicesList from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>DevicesList --- Renders DevicesList message to user (Mount + wrapping in <Provider>)',()=>{
  let devicesList = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      devicesList = mount(
        <Provider store={store}>
          <Router>
            <DevicesList />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(devicesList.length).toEqual(1)
  });


});

