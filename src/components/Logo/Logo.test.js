import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';
import {
  StaticRouter as Router,
} from 'react-router-dom';

import Logo from './Logo';

describe('Component: Logo', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Router context={{}}>
        <Logo />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
