import React from 'react';
import Enzyme, {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import EditSitePage from './index';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router }    from 'react-router-dom';


describe('>>>EditSitePage --- Render EditSite container (Mount + wrapping in <Provider>)',()=>{
  let editSitePage = [], store;
  const initialState = {};
  const mockStore = configureStore();

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      store = mockStore(initialState);
      editSitePage = mount(
        <Provider store={store}>
          <Router>
            <EditSitePage />
          </Router>
        </Provider>
    ) 
  });

  afterEach(() => {
    console.error = () => {}
  });

  it('+++ render the DUMB component', () => {
    expect(editSitePage.length).toEqual(1)
  });


});