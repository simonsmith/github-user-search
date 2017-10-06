import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import Stats from './Stats';

describe('Component: Stats', () => {

  it('should render', () => {
    const stats = {
      Foo: 'bar',
      Bla: 'yo',
    };
    const component = felaSnapshot(
      <Stats
        stats={stats}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
