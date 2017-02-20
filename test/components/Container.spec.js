import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
  StyleSheet,
} from 'aphrodite';

import Container from 'components/Container';

describe('Component: Container', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render', () => {
    const component = renderer.create(
      <Container>
        <div>inner component</div>
      </Container>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render style overrides', () => {
    const styles = StyleSheet.create({
      test: {color: 'red'},
    });
    const component = renderer.create(
      <Container extraStyle={styles.test}>
        <div>inner component</div>
      </Container>
    );
    expect(component).toMatchSnapshot();
  });

});

