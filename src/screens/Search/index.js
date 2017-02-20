// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import qs from 'query-string';
import DocumentTitle from 'react-document-title';
import isEmpty from 'lodash/fp/isEmpty';
import SearchResultsContainer from 'containers/SearchResults';
import HeaderContainer from 'containers/Header';

type Props = {
  push: Function,
  location: Object,
};

class SearchScreen extends Component {

  props: Props;

  static propTypes = {
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static constructTitle(search: Object) {
    const base = 'Github User Search';
    if (isEmpty(search)) {return base;}
    const {q, page} = search;
    return `${q} - Page ${page} - ${base}`;
  }

  pushUrlQuery = (query: string): void => {
    this.props.push({
      path: '/',
      search: `per_page=42&page=1&q=${query}`,
    });
  }

  render() {
    const {
      location,
    } = this.props;
    const parsedSearch = qs.parse(location.search);
    const title = SearchScreen.constructTitle(parsedSearch);

    return (
      <DocumentTitle title={title}>
        <div>
          <HeaderContainer
            searchTerm={parsedSearch.q}
            searchQuery={qs.stringify(parsedSearch)}
            onSubmit={this.pushUrlQuery}
          />
          <SearchResultsContainer
            searchTerm={parsedSearch.q}
          />
        </div>
      </DocumentTitle>
    );
  }

}

export default SearchScreen;
