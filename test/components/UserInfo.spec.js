import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import UserInfo from 'components/UserInfo';

describe('Component: UserInfo', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render only the props that are present', () => {
    const component = renderer.create(
      <UserInfo
        company="@cool place"
        location="London"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render nothing if all props are null', () => {
    const component = renderer.create(
      <UserInfo
        blog={null}
        location={null}
        company={null}
      />
    );
    expect(component).toMatchSnapshot();
  });

});

