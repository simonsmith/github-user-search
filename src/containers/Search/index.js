// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
} from 'aphrodite/no-important';
import SearchForm from 'components/SearchForm';
import SearchResults from 'components/SearchResults';
import Pagination from 'components/Pagination';
import SearchHeader from 'components/SearchHeader';
import Container from 'components/Container';
import connect from './connect';

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
    searchTerm: PropTypes.string.isRequired,
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

  renderSearchResults() {
    const {
      searchTerm,
      userIds,
      userEntities,
      totalResults,
    } = this.props;
    if (!searchTerm) {return null;}

    return (
      <SearchResults
        searchTerm={searchTerm}
        ids={userIds}
        entities={userEntities}
        total={totalResults}
      />
    );
  }

  renderPagination() {
    const {
      pagination,
      searchTerm,
    } = this.props;
    if (!searchTerm) {return null;}

    return (
      <Container rootStyle={styles.SearchContainer_pagination}>
        <Pagination {...pagination} />
      </Container>
    );
  }

  render() {
    const {
      onSubmit,
      searchTerm,
    } = this.props;

    return (
      <div>
        <Container rootStyle={styles.SearchContainer_header}>
          <SearchHeader>
            <SearchForm
              onSubmit={onSubmit}
              initialInputValue={searchTerm}
            />
          </SearchHeader>
        </Container>
        {this.renderPagination()}
        <Container noGutter={true}>
          {this.renderSearchResults()}
        </Container>
      </div>
    );
  }

}

const styles = StyleSheet.create({
  SearchContainer_pagination: {
    marginTop: 15,
    marginBottom: 15,
  },

  SearchContainer_header: {
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  },
});

export default connect(SearchContainer);
