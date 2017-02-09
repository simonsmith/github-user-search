// @flow

import React, {
  PropTypes,
} from 'react';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
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

function renderResultsMessage(searchTerm: string, total: number) {
  if (!searchTerm) {return null;}
  return (
    <p><b>{searchTerm}</b> found {total} {total === 1 ? 'result' : 'results'}</p>
  );
}

function SearchResults({entities, ids, searchTerm, total}: Props) {
  return (
    <div>
      {renderResultsMessage(searchTerm, total)}
      <ul>
        {map(renderSearchResult(entities), ids)}
      </ul>
    </div>
  );
}

SearchResults.propTypes = {
  entities: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default SearchResults;
