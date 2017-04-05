import React from 'react';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import Repo from 'components/Repo';

describe('Component: Repo', () => {

  beforeAll(() => {
    MockDate.set(new Date('2017-04-04T09:00:00Z'));
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    MockDate.reset();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render all data items', () => {
    const component = renderer.create(
      <Repo
        description="A description"
        fork={true}
        html_url="https://github.com"
        language="JS"
        name="some repo"
        stargazers_count={10}
        pushed_at="2017-04-01T09:00:00Z"
        forks_count={2}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should not render anything for optional data items', () => {
    const component = renderer.create(
      <Repo
        fork={false}
        html_url="https://github.com"
        name="some repo"
        stargazers_count={10}
        pushed_at="2017-04-01T09:00:00Z"
        forks_count={2}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
