// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';

type Props = {
  pageTotal: number,
  resultsTotal: number,
  searchTerm: string,
};

function ResultsMessage({searchTerm, resultsTotal, pageTotal}: Props) {
  if (!searchTerm || !pageTotal) {return null;}

  return (
    <div className="u-flex u-flexJustifyCenter">
      <p className={css(styles.ResultsMessage_text)}>
        Found {resultsTotal} {resultsTotal === 1 ? 'result' : 'results'} for <b>{searchTerm}</b>
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  ResultsMessage_text: {
    padding: 6,
    backgroundColor: '#fcf8bb',
    borderRadius: 8,
  },
});

export default ResultsMessage;
