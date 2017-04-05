import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheetTestUtils,
} from 'aphrodite';

import ItemList from 'components/ItemList';

function FakeComponent({login}) { // eslint-disable-line
  return <p>{login}</p>;
}

describe('Component: ItemList', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render components in a list', () => {
    const entities = {
      123: {
        login: 'simon',
      },
      456: {
        login: 'john',
      },
    };
    const component = renderer.create(
      <ItemList
        entities={entities}
        ids={[123, 456]}
        isPending={false}
        component={FakeComponent}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should display a message when no items exist', () => {
    const component = renderer.create(
      <ItemList
        entities={{}}
        ids={[]}
        isPending={false}
        component={FakeComponent}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render a Loading component when isPending', () => {
    const component = renderer.create(
      <ItemList
        entities={{}}
        ids={[]}
        isPending={true}
        component={FakeComponent}
      />
    );
    expect(component).toMatchSnapshot();
  });

});
