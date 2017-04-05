import React from 'react';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import RepoList from 'components/RepoList';

describe('Component: RepoList', () => {

  beforeAll(() => {
    MockDate.set(new Date('2017-04-04T09:00:00Z'));
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    MockDate.reset();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render Repo components', () => {
    const entities = {
      123: {
        description: 'My dotfiles, originally forked from Holmans dotfiles.',
        fork: false,
        html_url: 'https://github.com/smgt/dotfiles',
        language: 'Vim script',
        updated_at: '2017-04-04T09:47:48Z',
        name: 'dotfiles',
        stargazers_count: 3,
        forks_count: 0,
      },
      456: {
        description: 'My dotfiles, originally forked from Holmans dotfiles.',
        fork: true,
        html_url: 'https://github.com/smgt/dotfiles',
        language: 'Vim script',
        updated_at: '2017-04-04T09:47:48Z',
        name: 'dotfiles',
        stargazers_count: 3,
        forks_count: 0,
      },
    };
    const component = renderer.create(
      <RepoList
        entities={entities}
        ids={[123, 456]}
        isPending={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render a Loading component when isPending', () => {
    const component = renderer.create(
      <RepoList
        entities={{}}
        ids={[]}
        isPending={true}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
