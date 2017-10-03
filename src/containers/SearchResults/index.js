// @flow

import React from 'react';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import SearchResults from 'components/SearchResults';
import Pagination from 'components/Pagination';
import ResultsMessage from 'components/ResultsMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'components/Loading';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  isPending: boolean,
  pagination: ?Object,
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
    return (
      <div className={css(styles.SearchResultsContainer_wrapLoading)}>
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <div
        className={css(
          styles.SearchResultsContainer_item,
          styles.SearchResultsContainer_wrapResultsMessage
        )}
      >
        <ErrorBoundary>
          <ResultsMessage
            searchTerm={searchTerm}
            resultsTotal={totalResults}
            pageTotal={userIds.length}
          />
        </ErrorBoundary>
      </div>
      <div className={css(styles.SearchResultsContainer_item)}>
        <ErrorBoundary>
          <SearchResults
            searchTerm={searchTerm}
            ids={userIds}
            entities={userEntities}
            total={totalResults}
          />
        </ErrorBoundary>
      </div>
      <div className={css(styles.SearchResultsContainer_item)}>
        <ErrorBoundary>
          <Pagination {...pagination} />
        </ErrorBoundary>
      </div>
    </Container>
  );
}

SearchResultsContainer.defaultProps = {
  pagination: {},
  searchTerm: '',
};

const styles = StyleSheet.create({
  SearchResultsContainer_wrapResultsMessage: {
    marginBottom: 30,
  },

  SearchResultsContainer_wrapLoading: {
    marginTop: 25,
  },

  SearchResultsContainer_item: {
    marginTop: 15,
  },
});

export default connect(SearchResultsContainer);
