import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import Image from 'components/Image';

describe('Component: Image', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Image src="test.png" />
    );
    expect(component).toMatchSnapshot();
  });

  it('should hide the spinner if the image is loaded', () => {
    const wrapper = shallow(
      <Image src="test.png" />
    );
    wrapper.setState({status: 'loaded'});
    expect(wrapper.html()).toMatchSnapshot();
  });

});
