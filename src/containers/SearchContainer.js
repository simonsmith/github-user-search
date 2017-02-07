// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm';
import connect from './SearchConnect';

type Props = {
  push: Function,
  searchUser: Function,
  location: Object,
};

class SearchContainer extends Component {

  static propTypes = {
    push: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static getQueryFromUrl(search: string) {
    return queryString.parse(search).query;
  }

  constructor(props: Props) {
    super(props);
    this.handleSearchUser(props.location.search);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.location.search !== this.props.location.search) {
      this.handleSearchUser(nextProps.location.search);
    }
  }

  handleSearchUser(search: string) {
    if (!search) {return;}
    const query = SearchContainer.getQueryFromUrl(location.search);
    this.props.searchUser({query});
  }

  render() {
    const {
      push,
      location,
    } = this.props;
    const query = SearchContainer.getQueryFromUrl(location.search);

    return (
      <SearchForm
        pushRoute={push}
        searchQuery={query}
      />
    );
  }

}

export default connect(SearchContainer);
