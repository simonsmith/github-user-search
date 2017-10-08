import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';

import Container from './Container';

describe('Component: Container', () => {

  it('should render', () => {
    const component = felaSnapshot(
      <Container>
        <div>inner component</div>
      </Container>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render style overrides', () => {
    const component = felaSnapshot(
      <Container rootStyle="test">
        <div>inner component</div>
      </Container>
    );
    expect(component).toMatchSnapshot();
  });

});

