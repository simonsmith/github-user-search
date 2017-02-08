// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import connect from './SearchConnect';

type Props = {
  onSubmit: Function,
  searchUser: Function,
  userEntities: Object,
  userIds: Array<number>,
  totalResults: number,
  query: string,
};

export class SearchContainer extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    searchUser: PropTypes.func.isRequired,
    totalResults: PropTypes.number.isRequired,
    userEntities: PropTypes.object.isRequired,
    userIds: PropTypes.array.isRequired,
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
      onSubmit,
      query,
      totalResults,
      userEntities,
      userIds,
    } = this.props;

    return (
      <div>
        <SearchForm
          onSubmit={onSubmit}
          initialInputValue={query}
        />
        <SearchResults
          query={query}
          ids={userIds}
          entities={userEntities}
          total={totalResults}
        />
      </div>
    );
  }

}

export default connect(SearchContainer);
