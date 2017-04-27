import React from 'react';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';

import {RateLimitContainer} from 'containers/RateLimit';

describe('Container: RateLimitContainer', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <RateLimitContainer
        coreLimit={100}
        coreRemaining={100}
        coreReset="some date"
        searchLimit={100}
        searchRemaining={100}
        dispatch={jest.fn()}
        searchReset="some date"
      />
    );
    expect(component).toMatchSnapshot();
  });

});
