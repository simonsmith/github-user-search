// @flow

import React from 'react';
import SearchResultsContainer from 'containers/SearchResults';
import withBaseScreen from 'hoc/withBaseScreen';

function SearchScreen(props: Object) {
  return (
    <SearchResultsContainer {...props} />
  );
}

export default withBaseScreen(SearchScreen);
