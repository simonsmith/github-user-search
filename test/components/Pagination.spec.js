import React from 'react';
import renderer from 'react-test-renderer';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import {StyleSheetTestUtils} from 'aphrodite';

import Pagination from 'components/Pagination';

function createComponent(props) {
  return renderer.create(
    <Router context={{}}>
      <Pagination {...props} />
    </Router>
  );
}

describe('Component: Pagination', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when passed a next prop', () => {
    it('should render a next link', () => {
      const props = {
        next: {
          url: 'https://api.github.com/search/users?q=simon&page=2',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when passed a prev prop', () => {
    it('should render a previous link', () => {
      const props = {
        prev: {
          url: 'https://api.github.com/search/users?q=simon&page=1',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when passed a prev and next prop', () => {
    it('should render a previous and next link', () => {
      const props = {
        prev: {
          url: 'https://api.github.com/search/users?q=simon&page=1',
        },
        next: {
          url: 'https://api.github.com/search/users?q=simon&page=2',
        },
      };
      const component = createComponent(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
