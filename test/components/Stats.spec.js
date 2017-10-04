import React from 'react';
import Stats from 'components/Stats';
import felaSnapshot from 'test-util/fela-snapshot';

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
