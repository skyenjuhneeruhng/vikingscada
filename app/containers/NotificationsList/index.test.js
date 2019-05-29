import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NotificationsList from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>NotificationsList --- Renders NotificationsList message to user (Mount + wrapping in <Provider>)',()=>{
  let notificationsList = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      notificationsList = mount(
        <Provider store={store}>
          <Router>
            <NotificationsList />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(notificationsList.length).toEqual(1)
  });


});