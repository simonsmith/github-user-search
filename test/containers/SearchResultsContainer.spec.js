import React from 'react';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';

import {SearchResultsContainer} from 'containers/SearchResults';

describe('Component: SearchResultsContainer', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when the searchTerm is falsey', () => {
    it('should not render the pagination or results', () => {
      const component = renderer.create(
        <SearchResultsContainer
          isPending={true}
          searchTerm={''}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

});
