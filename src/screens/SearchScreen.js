// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import qs from 'query-string';
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

  pushUrlQuery = (value: string): void => {
    this.props.push({
      path: '/',
      search: qs.stringify({
        q: value,
        page: 1,
      }),
    });
  }

  render() {
    const {
      location,
      push,
    } = this.props;
    const parsedSearch = qs.parse(location.search);

    return (
      <div>
        <SearchContainer
          pushRoute={push}
          searchTerm={parsedSearch.q}
          search={qs.stringify(parsedSearch)}
          onSubmit={this.pushUrlQuery}
        />
      </div>
    );
  }

}

export default SearchScreen;
