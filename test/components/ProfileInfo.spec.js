import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import ProfileInfo from 'components/ProfileInfo';

describe('Component: UserInfo', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render only the props that are present', () => {
    const component = renderer.create(
      <ProfileInfo
        company="@cool place"
        location="London"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render nothing if all props are null', () => {
    const component = renderer.create(
      <ProfileInfo
        blog={null}
        location={null}
        company={null}
      />
    );
    expect(component).toMatchSnapshot();
  });

});

