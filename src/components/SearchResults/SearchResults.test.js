import React from 'react';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import felaSnapshot from 'test-util/fela-snapshot';

import SearchResults from './SearchResults';

function createComponent(props) {
  return felaSnapshot(
    <Router context={{}}>
      <SearchResults {...props} />
    </Router>
  );
}

describe('Component: SearchResults', () => {

  describe('when given a set of results and entities', () => {
    it('should render them with a message', () => {
      const props = {
        entities: {
          1: {login: 'foo', avatar_url: 'avatar.jpg', id: 1},
          2: {login: 'foobar', avatar_url: 'avatar.jpg', id: 2},
        },
        ids: [1, 2],
        searchTerm: 'foo',
        total: 2,
      };
      const component = createComponent(props);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when given a one result', () => {
    it('should render a correctly worded message', () => {
      const props = {
        entities: {
          1: {login: 'foo', avatar_url: 'avatar.jpg', id: 1},
        },
        ids: [1],
        searchTerm: 'foo',
        total: 1,
      };
      const component = createComponent(props);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when the results are 0', () => {
    it('should not render a message', () => {
      const props = {
        entities: {},
        ids: [],
        searchTerm: 'foo',
        total: 0,
      };
      const component = createComponent(props);
      expect(component).toMatchSnapshot();
    });
  });

});
