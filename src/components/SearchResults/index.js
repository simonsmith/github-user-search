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
  searchTerm: string,
  ids: Array<number>,
  total: number,
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

function renderResultsMessage(searchTerm: string, total: number, resultLength: number) {
  if (!searchTerm || !resultLength) {return null;}
  return (
    <p><b>{searchTerm}</b> found {total} {total === 1 ? 'result' : 'results'}</p>
  );
}

function SearchResults({entities, ids, searchTerm, total}: Props) {
  return (
    <div className={css(styles.SearchResults)}>
      {renderResultsMessage(searchTerm, total, ids.length)}
      <ul className={css(styles.SearchResults_list)}>
        {map(renderSearchResult(entities), ids)}
      </ul>
    </div>
  );
}

SearchResults.propTypes = {
  entities: PropTypes.object,
  searchTerm: PropTypes.string,
  ids: PropTypes.array,
  total: PropTypes.number,
};

const BREAKPOINT = '@media (min-width: 600px)';

const styles = StyleSheet.create({
  SearchResults: {
    maxWidth: 1280,
    margin: '0 auto',
  },

  SearchResults_list: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  SearchResults_item: {
    flex: '1 0 auto',

    [BREAKPOINT]: {
      ':only-child': {
        flex: 0,
      },
    },
  },
});

export default SearchResults;
