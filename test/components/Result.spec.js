import React from 'react';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Result from 'components/Result';

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
      <Router>
        <Result {...props} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
