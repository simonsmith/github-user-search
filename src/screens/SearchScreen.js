// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import queryString from 'query-string';
import isUndefined from 'lodash/fp/isUndefined';
import SearchContainer from '../containers/SearchContainer';

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

  static getQueryFromUrl(search: string): string {
    const query = queryString.parse(search).query;
    return isUndefined(query) ? '' : query;
  }

  render() {
    const {
      location,
      push,
    } = this.props;
    const query = SearchScreen.getQueryFromUrl(location.search);

    return (
      <div>
        <SearchContainer
          pushRoute={push}
          query={query}
        />
      </div>
    );
  }

}

export default SearchScreen;
