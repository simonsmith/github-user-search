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
      <p>
        <b>{searchTerm}</b> found {resultsTotal} {resultsTotal === 1 ? 'result' : 'results'}
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

  },
});

export default ResultsMessage;
