import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import ProfileHeader from 'components/ProfileHeader';

describe('Component: ProfileHeader', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const props = {
      avatar_url: 'url',
      bio: 'bio',
      blog: 'blog',
      company: 'company',
      followers: 20,
      following: 40,
      html_url: 'html_url',
      location: 'location',
      login: 'login',
      name: 'name',
      id: 123,
      public_repos: 12,
    };
    const component = renderer.create(
      <ProfileHeader {...props} />
    );
    expect(component).toMatchSnapshot();
  });

});
