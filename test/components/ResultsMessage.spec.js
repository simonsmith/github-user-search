import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import ResultsMessage from 'components/ResultsMessage';

describe('Component: ResultsMessage', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <ResultsMessage
        searchTerm={'test'}
        pageTotal={10}
        resultsTotal={50}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should handle single results', () => {
    const component = renderer.create(
      <ResultsMessage
        searchTerm={'test'}
        pageTotal={1}
        resultsTotal={1}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
