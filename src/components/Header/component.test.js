import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import Header from './';

describe('Component: Header', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Header onSubmit={jest.fn()} searchTerm="test">
        <div>inner component</div>
      </Header>
    );
    expect(component).toMatchSnapshot();
  });

});
