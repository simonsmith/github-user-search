import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';

import ResultsMessage from './ResultsMessage';

describe('Component: ResultsMessage', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <ResultsMessage
        searchTerm={'test'}
        pageTotal={10}
        resultsTotal={50}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should handle single results', () => {
    const component = felaSnapshot(
      <ResultsMessage
        searchTerm={'test'}
        pageTotal={1}
        resultsTotal={1}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
