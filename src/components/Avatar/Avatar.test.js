import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import Avatar from './Avatar';

describe('Component: Avatar', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Avatar
        url="http://avatar.net"
        name="Simon"
        width={300}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
