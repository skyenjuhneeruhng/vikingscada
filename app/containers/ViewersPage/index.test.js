import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Viewers from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>Viewers --- Render Viewers container (Mount + wrapping in <Provider>)',()=>{
  let viewers = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      viewers = mount(
        <Provider store={store}>
          <Router>
            <Viewers />
          </Router>
        </Provider>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(viewers.length).toEqual(1)
  });


});