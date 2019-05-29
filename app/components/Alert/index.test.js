import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Alert from './index';

import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';


describe('>>>ALERT --- Snapshot',()=>{
  it('+++capturing Snapshot of Alert', () => {
    // Render a checkbox with label in the document

    const type = 'danger';
    const iconClass = 'flaticon-exclamation-1';
    const text = 'You are rejected. Please, contact support';

    const alert = renderer.create(
      <Alert type={type} iconClass={iconClass} text={text} />
    );

    let tree = alert.toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('>>>ALERT --- Renders Alert message to user',()=>{
  let wrapper = [];
  const type = 'danger';
  const iconClass = 'flaticon-exclamation-1';
  const text = 'You are rejected. Please, contact support';

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      wrapper = shallow(<Alert type={type} iconClass={iconClass} text={text} />) 
  })

  it('+++ render the DUMB component', () => {
     expect(wrapper.length).toEqual(1)
  });
    
  it('+++ contains text', () => {
      expect(wrapper.find('.m-alert__text').text()).toEqual(text)
  });

  it('+++ has class type', () => {
    expect(wrapper.find('.alert').hasClass(type))
  });

  it('+++ has class iconClass', () => {
    expect(wrapper.find('.m-alert__icon > i').hasClass(iconClass))
  });
  
});