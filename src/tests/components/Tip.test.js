import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'react-native';
import Tip from '../../components/Tip';

describe('Tip component', () => {
  it('has four tip buttons', () => {
    const wrapper = mount(<Tip amount={15} />);
    expect(wrapper.find(Button)).toHaveLength(4);
  });
});