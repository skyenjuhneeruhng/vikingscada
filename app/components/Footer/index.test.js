import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Footer from './index';

import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';


describe('>>>Footer --- Renders Footer message to user',()=>{
  let footer;
  
  const copyright = '© 2018 Viking SCADA';

  Enzyme.configure({ adapter: new Adapter() })

  beforeEach(()=>{
      footer = shallow(
        <Footer/>
    ) 
  })

  it('+++ render the DUMB component', () => {
     expect(footer.length).toEqual(1)
  });

  it('+++capturing Snapshot of Footer', () => {

    const footer = renderer.create(
      <Footer/>
    );
    let tree = footer.toJSON();
    expect(tree).toMatchSnapshot();
  });
 
});