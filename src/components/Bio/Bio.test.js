import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import Bio from './Bio';

describe('Component: Bio', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Bio
        text="This is some bio text with @link"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should not render if props is absent', () => {
    const component = felaSnapshot(
      <Bio />
    );
    expect(component).toMatchSnapshot();
  });

});
