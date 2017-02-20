// @flow

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  pageTotal: number,
  resultsTotal: number,
  searchTerm: string,
};

function ResultsMessage({searchTerm, resultsTotal, pageTotal}: Props) {
  if (!searchTerm || !pageTotal) {return null;}

  return (
    <p className={css(styles.ResultsMessage)}>
      Found {resultsTotal} {resultsTotal === 1 ? 'result' : 'results'} for <b>{searchTerm}</b>
    </p>
  );
}

ResultsMessage.propTypes = {
  searchTerm: PropTypes.string,
  resultsTotal: PropTypes.number,
  pageTotal: PropTypes.number,
};

const styles = StyleSheet.create({
  ResultsMessage: {
    textAlign: 'center',
  },
});

export default ResultsMessage;
