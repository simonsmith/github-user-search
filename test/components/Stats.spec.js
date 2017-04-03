import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import Stats from 'components/Stats';

describe('Component: Stats', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const stats = {
      Foo: 'bar',
      Bla: 'yo',
    };
    const component = renderer.create(
      <Stats
        stats={stats}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
