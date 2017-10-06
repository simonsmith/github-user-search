import React from 'react';
import felaSnapshot from 'test-util/fela-snapshot';

import ItemList from './ItemList';

function FakeComponent({login}) { // eslint-disable-line
  return <p>{login}</p>;
}

describe('Component: ItemList', () => {

  it('should render components in a list', () => {
    const entities = {
      123: {
        login: 'simon',
      },
      456: {
        login: 'john',
      },
    };
    const component = felaSnapshot(
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
    const component = felaSnapshot(
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
    const component = felaSnapshot(
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
