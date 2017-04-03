import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import Avatar from 'components/Avatar';

describe('Component: Avatar', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Avatar
        url="http://avatar.net"
        name="Simon"
        width={300}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
