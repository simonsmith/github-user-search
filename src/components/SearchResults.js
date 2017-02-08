// @flow

import React, {
  PropTypes,
} from 'react';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import Result from './Result';

type Props = {
  entities: Object,
  query: string,
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

function renderResultsMessage(query: string, total: number) {
  if (total === 0) {return null;}
  return (
    <p>Searching {query} found {total} {total === 1 ? 'result' : 'results'}</p>
  );
}

function SearchResults({entities, ids, query, total}: Props) {
  return (
    <div>
      {renderResultsMessage(query, total)}
      <ul>
        {map(renderSearchResult(entities), ids)}
      </ul>
    </div>
  );
}

SearchResults.propTypes = {
  entities: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default SearchResults;
