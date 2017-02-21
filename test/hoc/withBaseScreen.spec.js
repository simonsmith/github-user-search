import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import withBaseScreen, {
  constructTitle,
  pushUrlQuery,
} from 'hoc/withBaseScreen';

function createComponent(component) {
  const mockStore = configureMockStore();
  const store = mockStore();
  return renderer.create(
    <Provider store={store}>
      <Router>
        {component}
      </Router>
    </Provider>
  ).toJSON();
}

describe('HOC: withBaseScreen', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when passed a component', () => {
    it('should render it in the base screen', () => {
      const props = {
        location: {},
        push: jest.fn(),
        other: 'test',
      };
      const component = () => <p>test</p>;
      const WithBase = withBaseScreen(component);
      expect(createComponent(<WithBase {...props} />)).toMatchSnapshot();
    });
  });

  describe('constructTitle function', () => {
    it('should use the base title when no search query is present', () => {
      const title = constructTitle({});
      expect(title).toEqual('Github User Search');
    });

    it('should return a title describing current search and page', () => {
      const title = constructTitle({q: 'foo', page: 2});
      expect(title).toEqual('foo - Page 2 - Github User Search');
    });
  });

  describe('pushUrlQuery function', () => {
    it('should push a search query on the URL', () => {
      const spy = jest.fn();
      pushUrlQuery(spy, 'testing');
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

});

