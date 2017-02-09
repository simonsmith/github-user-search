import React from 'react';
import renderer from 'react-test-renderer';

import Result from '../../src/components/Result';

describe('Component: Result', () => {

  it('should render', () => {
    const props = {
      username: 'foo',
      avatarUrl: 'src.jpg',
    };
    const component = renderer.create(
      <Result {...props} />
    );
    expect(component).toMatchSnapshot();
  });

});
