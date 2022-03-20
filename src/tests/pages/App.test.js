import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../App';
import AddItem from '../../components/AddItem';
import Tip from '../../components/Tip';


describe('App page', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads all the expected components', () => {
    expect(wrapper.find(AddItem)).toHaveLength(1);
    expect(wrapper.find(Tip)).toHaveLength(1);
  })
})