import React from 'react';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import felaSnapshot from 'test-util/fela-snapshot';
import User from 'components/User';

describe('Component: User', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Router context={{}}>
        <User
          login="simon"
          avatar_url="url"
        />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
