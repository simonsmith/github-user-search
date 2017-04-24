import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import RateLimit from 'components/RateLimit';

describe('Component: RateLimit', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render `high` when above 75% of the API calls remaining', () => {
    const component = renderer.create(
      <RateLimit
        label="test"
        reset="some date"
        remaining={76}
        limit={100}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render `medium` when below 75% of the API calls remaining', () => {
    const component = renderer.create(
      <RateLimit
        label="test"
        reset="some date"
        remaining={70}
        limit={100}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render `low` when below 25% of the API calls remaining', () => {
    const component = renderer.create(
      <RateLimit
        label="test"
        reset="some date"
        remaining={24}
        limit={100}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
