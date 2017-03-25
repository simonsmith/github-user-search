import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import {
  StaticRouter as Router,
} from 'react-router-dom';

import Logo from 'components/Logo';

describe('Component: Logo', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Router context={{}}>
        <Logo />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
