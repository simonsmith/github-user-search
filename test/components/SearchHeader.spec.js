import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import SearchHeader from '../../src/components/SearchHeader';

describe('Component: SearchHeader', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <SearchHeader>
        <div>inner component</div>
      </SearchHeader>
    );
    expect(component).toMatchSnapshot();
  });


});
