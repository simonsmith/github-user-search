// @flow

import React from 'react';
import {connect} from 'react-fela';
import UserList from 'components/UserList/UserList';
import Pagination from 'components/Pagination';
import ResultsMessage from 'components/ResultsMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'components/Loading';
import Container from 'components/Container';

type Props = {
  isPending: boolean,
  pagination: ?Object,
  searchTerm: string,
  totalResults: number,
  userEntities: Object,
  userIds: Array<number>,
  styles: Object,
};

export function SearchResults(props: Props) {
  const {
    isPending,
    pagination,
    searchTerm,
    totalResults,
    userEntities,
    userIds,
    styles,
  } = props;

  if (!searchTerm) {return null;}

  if (isPending) {
    return (
      <div className={styles.SearchResults_loading}>
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <div
        className={styles.SearchResults_resultsMessage}
      >
        <ErrorBoundary>
          <ResultsMessage
            searchTerm={searchTerm}
            resultsTotal={totalResults}
            pageTotal={userIds.length}
          />
        </ErrorBoundary>
      </div>
      <div className={styles.SearchResults_item}>
        <ErrorBoundary>
          <UserList
            searchTerm={searchTerm}
            ids={userIds}
            entities={userEntities}
            total={totalResults}
          />
        </ErrorBoundary>
      </div>
      <div className={styles.SearchResults_item}>
        <ErrorBoundary>
          <Pagination {...pagination} />
        </ErrorBoundary>
      </div>
    </Container>
  );
}

SearchResults.defaultProps = {
  pagination: {},
  searchTerm: '',
};

const styles = {
  SearchResults_resultsMessage: () => ({
    marginBottom: 30,
    marginTop: 15,
  }),

  SearchResults_loading: () => ({
    marginTop: 25,
  }),

  SearchResults_item: () => ({
    marginTop: 15,
  }),
};

export default connect(styles)(SearchResults);
