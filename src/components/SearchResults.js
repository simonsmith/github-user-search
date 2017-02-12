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
import Result from './Result';

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
    <li key={id}>
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
    <div>
      {renderResultsMessage(searchTerm, total, ids.length)}
      <ul className={css(styles.SearchResults_List)}>
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

const styles = StyleSheet.create({
  SearchResults_List: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export default SearchResults;
