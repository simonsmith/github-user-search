import React from 'react';
import renderer from 'react-test-renderer';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import User from 'components/User';

describe('Component: User', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Router context={{}}>
        <User
          login="simon"
          avatar_url="url"
        />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
