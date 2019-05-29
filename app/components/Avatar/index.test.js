import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Avatar from './index';

import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';


describe('>>>AVATAR --- Renders Avatar message to user',()=>{
  let wrapper;

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      wrapper = shallow(<Avatar/>) 
  })

  it('+++ render the DUMB component', () => {
     expect(wrapper.length).toEqual(1)
  });
    
});