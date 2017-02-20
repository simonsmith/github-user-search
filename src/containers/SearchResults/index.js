// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
} from 'aphrodite/no-important';
import SearchResults from 'components/SearchResults';
import Pagination from 'components/Pagination';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  pagination: Object,
  searchTerm: string,
  searchUser: Function,
  totalResults: number,
  userEntities: Object,
  userIds: Array<number>,
};

export class SearchResultsContainer extends Component {

  props: Props;

  static propTypes = {
    pagination: PropTypes.object,
    searchTerm: PropTypes.string.isRequired,
    totalResults: PropTypes.number.isRequired,
    userEntities: PropTypes.object.isRequired,
    userIds: PropTypes.array.isRequired,
  };

  static defaultProps = {
    pagination: {},
  };

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
      <Container rootStyle={styles.SearchResultsContainer_pagination}>
        <Pagination {...pagination} />
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.renderPagination()}
        <Container noGutter={true}>
          {this.renderSearchResults()}
        </Container>
      </div>
    );
  }

}

const styles = StyleSheet.create({
  SearchResultsContainer_pagination: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default connect(SearchResultsContainer);
