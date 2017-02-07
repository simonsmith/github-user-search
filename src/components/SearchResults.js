// @flow

import React, {
  PropTypes,
} from 'react';
import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import Result from './Result';

type Props = {
  entities: Object,
  results: Array<number>,
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

function SearchResults({entities, results}: Props) {
  return (
    <ul>
      {map(renderSearchResult(entities), results)}
    </ul>
  );
}

SearchResults.propTypes = {
  entities: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};

export default SearchResults;
