// @flow

import React from 'react';
import SearchResultsContainer from 'containers/SearchResults';
import pageTitle from 'util/page-title';
import qs from 'query-string';
import isEmpty from 'lodash/fp/isEmpty';
import DocumentTitle from 'react-document-title';

function constructTitle(search: Object): string {
  if (isEmpty(search)) {return pageTitle();}
  const {q, page} = search;
  return pageTitle(`${q} - Page ${page}`);
}

function SearchScreen(matchProps: Object) {
  const {location} = matchProps;
  const parsedSearch = qs.parse(location.search);
  const title = constructTitle(parsedSearch);

  return (
    <DocumentTitle title={title}>
      <SearchResultsContainer {...matchProps} searchTerm={parsedSearch.q} />
    </DocumentTitle>
  );
}

export default SearchScreen;
