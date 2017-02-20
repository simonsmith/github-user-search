// @flow

import React, {
  PropTypes,
} from 'react';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import Result from 'components/Result';

type Props = {
  entities: Object,
  ids: Array<number>,
};

const renderSearchResult = curry((entities, item) => {
  const {
    id,
    avatar_url: avatarUrl,
    login,
  } = entities[item];
  return (
    <li key={id} className={css(styles.SearchResults_item)}>
      <Result
        username={login}
        avatarUrl={avatarUrl}
      />
    </li>
  );
});

function SearchResults({entities, ids}: Props) {
  return (
    <ul className={css(styles.SearchResults)}>
      {map(renderSearchResult(entities), ids)}
    </ul>
  );
}

SearchResults.propTypes = {
  entities: PropTypes.object,
  ids: PropTypes.array,
};

const BREAKPOINT = '@media (min-width: 600px)';

const styles = StyleSheet.create({
  SearchResults: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 3,
  },

  SearchResults_item: {
    flex: '1 0 auto',
    marginRight: 3,
    marginBottom: 3,

    [BREAKPOINT]: {
      ':only-child': {
        flex: 0,
      },
    },
  },
});

export default SearchResults;
