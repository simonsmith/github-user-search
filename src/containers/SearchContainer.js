// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import connect from './SearchConnect';

type Props = {
  onSubmit: Function,
  pagination: Object,
  search: Object,
  search: string,
  searchUser: Function,
  totalResults: number,
  userEntities: Object,
  userIds: Array<number>,
};

export class SearchContainer extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    pagination: PropTypes.object,
    search: PropTypes.string.isRequired,
    searchTerm: PropTypes.string,
    searchUser: PropTypes.func.isRequired,
    totalResults: PropTypes.number.isRequired,
    userEntities: PropTypes.object.isRequired,
    userIds: PropTypes.array.isRequired,
  };

  static defaultProps = {
    searchTerm: '',
    pagination: {},
  };

  constructor(props: Props) {
    super(props);
    this.handleSearchUser(props.search);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.search !== this.props.search) {
      this.handleSearchUser(nextProps.search);
    }
  }

  handleSearchUser(search: string): void {
    if (!search) {return;}
    this.props.searchUser(search);
  }

  render() {
    const {
      onSubmit,
      pagination,
      searchTerm,
      totalResults,
      userEntities,
      userIds,
    } = this.props;

    return (
      <div>
        <SearchForm
          onSubmit={onSubmit}
          initialInputValue={searchTerm}
        />
        <Pagination {...pagination} />
        <SearchResults
          searchTerm={searchTerm}
          ids={userIds}
          entities={userEntities}
          total={totalResults}
        />
      </div>
    );
  }

}

export default connect(SearchContainer);
