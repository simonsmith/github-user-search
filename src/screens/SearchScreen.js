// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import queryString from 'query-string';
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
      search: queryString.stringify({
        q: value,
      }),
    });
  }

  render() {
    const {
      location,
      push,
    } = this.props;
    const search = queryString.parse(location.search);

    return (
      <div>
        <SearchContainer
          pushRoute={push}
          search={search}
          onSubmit={this.pushUrlQuery}
        />
      </div>
    );
  }

}

export default SearchScreen;
