import React from 'react';
import MockDate from 'mockdate';
import felaSnapshot from 'test-util/fela-snapshot';

import Repo from './Repo';

describe('Component: Repo', () => {

  beforeAll(() => {
    MockDate.set(new Date('2017-04-04T09:00:00Z'));
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should render all data items', () => {
    const component = felaSnapshot(
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
    const component = felaSnapshot(
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
