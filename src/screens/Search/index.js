// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import qs from 'query-string';
import DocumentTitle from 'react-document-title';
import isEmpty from 'lodash/fp/isEmpty';
import SearchContainer from 'containers/Search';

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
      search: `per_page=48&page=1&q=${query}`,
    });
  }

  render() {
    const {
      location,
      push,
    } = this.props;
    const parsedSearch = qs.parse(location.search);
    const title = SearchScreen.constructTitle(parsedSearch);

    return (
      <DocumentTitle title={title}>
        <SearchContainer
          pushRoute={push}
          searchTerm={parsedSearch.q}
          search={qs.stringify(parsedSearch)}
          onSubmit={this.pushUrlQuery}
        />
      </DocumentTitle>
    );
  }

}

export default SearchScreen;
