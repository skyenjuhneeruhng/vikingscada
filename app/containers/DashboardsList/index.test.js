import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DashboardsList from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>DashboardsList --- Renders DashboardsList message to user (Mount + wrapping in <Provider>)',()=>{
  let dashboardsList = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      dashboardsList = mount(
        <Provider store={store}>
          <Router>
            <DashboardsList />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(dashboardsList.length).toEqual(1)
  });


});