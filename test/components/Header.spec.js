import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import {
  StaticRouter as Router,
} from 'react-router-dom';

import Header from 'components/Header';

describe('Component: Header', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Router context={{}}>
        <Header onSubmit={jest.fn()} searchTerm="test">
          <div>inner component</div>
        </Header>
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
