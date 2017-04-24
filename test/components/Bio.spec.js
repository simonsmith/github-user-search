import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';
import Bio from 'components/Bio';

describe('Component: Bio', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Bio
        text="This is some bio text with @link"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should not render if props is absent', () => {
    const component = renderer.create(
      <Bio />
    );
    expect(component).toMatchSnapshot();
  });

});
