// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import Loading from 'components/Loading';

type Props = {
  entities: Object,
  component: ReactClass<*>,
  ids: Array<number>,
  isPending: boolean,
};

const renderListItem = curry((entities, Component, id) => {
  return (
    <li
      className={css(styles.ItemList_item)}
      key={id}
    >
      <Component {...entities[id]} />
    </li>
  );
});

export default function ItemList(props: Props) {
  const {
    entities,
    ids,
    isPending,
    component: Component,
  } = props;
  if (isPending) {
    return (
      <Loading />
    );
  }

  if (ids.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <ul>
      {map(renderListItem(entities, Component), ids)}
    </ul>
  );
}

const styles = StyleSheet.create({
  ItemList_item: {
    borderBottom: '1px solid #ddd',
    marginBottom: 20,
    paddingBottom: 20,

    ':last-child': {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: 0,
    },
  },
});
