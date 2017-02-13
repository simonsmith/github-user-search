import React from 'react';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';

import Result from './';

describe('Component: Result', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const props = {
      username: 'foo',
      avatarUrl: 'src.jpg',
    };
    const component = renderer.create(
      <Result {...props} />
    );
    expect(component).toMatchSnapshot();
  });

});
