import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import SearchResults from './SearchResults';

describe('Component: SearchResults', () => {

  describe('when the searchTerm is falsey', () => {
    it('should not render the pagination or results', () => {
      const component = felaSnapshot(
        <SearchResults
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

  describe('when isPending is true', () => {
    it('should render a Loading component', () => {
      const component = felaSnapshot(
        <SearchResults
          isPending={true}
          searchTerm={'test'}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

});

