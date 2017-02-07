// @flow

import React from 'react';
import queryString from 'query-string';
import isUndefined from 'lodash/fp/isUndefined';
import SearchContainer from '../containers/SearchContainer';

function getQueryFromUrl(search: string): string {
  const query = queryString.parse(search).query;
  return isUndefined(query) ? '' : query;
}

function SearchScreen({location, push}: Object) {
  const query = getQueryFromUrl(location.search);

  return (
    <div>
      <SearchContainer
        pushRoute={push}
        query={query}
      />
    </div>
  );
}

export default SearchScreen;
