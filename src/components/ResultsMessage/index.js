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
    <div className={css(styles.ResultsMessage)}>
      <p className={css(styles.ResultsMessage_text)}>
        Found {resultsTotal} {resultsTotal === 1 ? 'result' : 'results'} for <b>{searchTerm}</b>
      </p>
    </div>
  );
}

ResultsMessage.propTypes = {
  searchTerm: PropTypes.string,
  resultsTotal: PropTypes.number,
  pageTotal: PropTypes.number,
};

const styles = StyleSheet.create({
  ResultsMessage: {
    display: 'flex',
    justifyContent: 'center',
  },

  ResultsMessage_text: {
    padding: 6,
    backgroundColor: '#fcf8bb',
    borderRadius: 8,
  },
});

export default ResultsMessage;
