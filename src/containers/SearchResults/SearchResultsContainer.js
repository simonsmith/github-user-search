// @flow

import React from 'react';
import SearchResults from 'components/SearchResults/SearchResults';
import connect from './connect';

function SearchResultsContainer(props: Object) {
  return <SearchResults {...props} />;
}

export default connect(SearchResultsContainer);
