import React from 'react';
import {
  StaticRouter as Router,
} from 'react-router-dom';
import felaSnapshot from 'test-util/fela-snapshot';

import Header from './Header';

describe('Component: Header', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Router context={{}}>
        <Header onSubmit={jest.fn()} searchTerm="test">
          <div>inner component</div>
        </Header>
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

});
