import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import {Provider} from 'react-redux';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import DefaultLayout, {
  pushUrlQuery,
} from 'screens/Default';

function createComponent(component) {
  const mockStore = configureMockStore();
  const store = mockStore();
  return renderer.create(
    <Provider store={store}>
      <Router context={{}}>
        {component}
      </Router>
    </Provider>
  ).toJSON();
}

describe('Screen: DefaultLayout', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when passed a component', () => {
    it('should render it in the default layout', () => {
      const component = () => <p>testing</p>;
      const screen = <DefaultLayout component={component} />;
      expect(createComponent(screen)).toMatchSnapshot();
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
