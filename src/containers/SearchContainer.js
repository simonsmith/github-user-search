// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import SearchForm from '../components/SearchForm';
import connect from './SearchConnect';

type Props = {
  pushRoute: Function,
  searchUser: Function,
  query: string,
};

export class SearchContainer extends Component {

  static propTypes = {
    pushRoute: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.handleSearchUser(props.query);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.query !== this.props.query) {
      this.handleSearchUser(nextProps.query);
    }
  }

  handleSearchUser(query: string): void {
    if (!query) {return;}
    this.props.searchUser({query});
  }

  render() {
    const {
      query,
      pushRoute,
    } = this.props;

    return (
      <div>
        <SearchForm
          pushRoute={pushRoute}
          query={query}
        />
      </div>
    );
  }

}

export default connect(SearchContainer);
