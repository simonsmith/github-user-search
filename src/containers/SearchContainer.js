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
  search: Object,
};

export class SearchContainer extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    searchUser: PropTypes.func.isRequired,
    totalResults: PropTypes.number.isRequired,
    userEntities: PropTypes.object.isRequired,
    userIds: PropTypes.array.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.handleSearchUser(props.search.q);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.search.q !== this.props.search.q) {
      this.handleSearchUser(nextProps.search.q);
    }
  }

  handleSearchUser(query: string): void {
    if (!query) {return;}
    this.props.searchUser({query});
  }

  render() {
    const {
      onSubmit,
      search,
      totalResults,
      userEntities,
      userIds,
    } = this.props;
    const {q} = search;

    return (
      <div>
        <SearchForm
          onSubmit={onSubmit}
          initialInputValue={q}
        />
        <SearchResults
          searchTerm={q}
          ids={userIds}
          entities={userEntities}
          total={totalResults}
        />
      </div>
    );
  }

}

export default connect(SearchContainer);
