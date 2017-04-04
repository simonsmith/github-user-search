// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import Repo from 'components/Repo';
import Loading from 'components/Loading';

type Props = {
  entities: Object,
  ids: Array<number>,
  isPending: boolean,
};

const renderRepoListItem = curry((entities, id) => {
  return (
    <li
      className={css(styles.RepoList_item)}
      key={id}
    >
      <Repo {...entities[id]} />
    </li>
  );
});

export default function RepoList({entities, ids, isPending}: Props) {
  if (isPending) {
    return (
      <Loading />
    );
  }

  return (
    <ul>
      {map(renderRepoListItem(entities), ids)}
    </ul>
  );
}

const styles = StyleSheet.create({
  RepoList_item: {
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
