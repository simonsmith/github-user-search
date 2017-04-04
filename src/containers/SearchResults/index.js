// @flow

import React from 'react';
import {
  StyleSheet,
} from 'aphrodite/no-important';
import SearchResults from 'components/SearchResults';
import Pagination from 'components/Pagination';
import ResultsMessage from 'components/ResultsMessage';
import Loading from 'components/Loading';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  isPending: boolean,
  pagination: Object,
  searchTerm: string,
  totalResults: number,
  userEntities: Object,
  userIds: Array<number>,
};

export function SearchResultsContainer(props: Props) {
  const {
    isPending,
    pagination,
    searchTerm,
    totalResults,
    userEntities,
    userIds,
  } = props;

  if (!searchTerm) {return null;}

  if (isPending) {
    return <Loading />;
  }

  return (
    <div>
      <Container
        rootStyle={styles.SearchResultsContainer_item}
      >
        <ResultsMessage
          searchTerm={searchTerm}
          resultsTotal={totalResults}
          pageTotal={userIds.length}
        />
      </Container>
      <Container
        noGutter={true}
        rootStyle={styles.SearchResultsContainer_item}
      >
        <SearchResults
          searchTerm={searchTerm}
          ids={userIds}
          entities={userEntities}
          total={totalResults}
        />
      </Container>
      <Container rootStyle={styles.SearchResultsContainer_item}>
        <Pagination {...pagination} />
      </Container>
    </div>
  );
}

SearchResultsContainer.defaultProps = {
  pagination: {},
  searchTerm: '',
};

const styles = StyleSheet.create({
  SearchResultsContainer_item: {
    marginTop: 15,
  },
});

export default connect(SearchResultsContainer);
