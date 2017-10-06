import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import ProfileTitle from './ProfileTitle';

describe('Component: ProfileTitle', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <ProfileTitle
        name="Simon"
        username="simonsmith"
        userLink="http://simonsmith.io"
      />
    );
    expect(component).toMatchSnapshot();
  });

});
