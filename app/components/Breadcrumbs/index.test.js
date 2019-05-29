import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Breadcrumbs from './index';

import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';


describe('>>>Breadcrumbs --- Renders Breadcrumbs message to user',()=>{
  let wrapper = [];

  const pages = [{ link: '../home', label: 'Home' }];
  const curent = 'Profile';

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      wrapper = shallow(
        <Breadcrumbs pages={pages} curent={curent}/>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(wrapper.length).toEqual(1)
  });

  it('+++ renders props corectry', () => {
    expect(wrapper.instance().props.curent).toBe(curent)
  });

  it('+++ renders props corectry', () => {
    expect(wrapper.instance().props.pages).toBe(pages)
  });
    
});