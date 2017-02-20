// @flow

import React, {
  PropTypes,
} from 'react';
import qs from 'query-string';
import DocumentTitle from 'react-document-title';
import isEmpty from 'lodash/fp/isEmpty';
import curry from 'lodash/fp/curry';
import SearchResultsContainer from 'containers/SearchResults';
import HeaderContainer from 'containers/Header';

type Props = {
  push: Function,
  location: Object,
};

export const pushUrlQuery = curry((push: Function, query: string) => {
  push({
    path: '/',
    search: `per_page=42&page=1&q=${query}`,
  });
});

export function constructTitle(search: Object) {
  const base = 'Github User Search';
  if (isEmpty(search)) {return base;}
  const {q, page} = search;
  return `${q} - Page ${page} - ${base}`;
}

function SearchScreen({location, push}: Props) {
  const parsedSearch = qs.parse(location.search);
  const title = constructTitle(parsedSearch);

  return (
    <DocumentTitle title={title}>
      <div>
        <HeaderContainer
          searchTerm={parsedSearch.q}
          searchQuery={qs.stringify(parsedSearch)}
          onSubmit={pushUrlQuery(push)}
        />
        <SearchResultsContainer
          searchTerm={parsedSearch.q}
        />
      </div>
    </DocumentTitle>
  );
}

SearchScreen.propTypes = {
  push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default SearchScreen;
