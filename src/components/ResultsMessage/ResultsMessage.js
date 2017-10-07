// @flow

import React from 'react';
import {connect} from 'react-fela';

type Props = {
  pageTotal: number,
  resultsTotal: number,
  searchTerm: string,
  styles: Object,
};

function ResultsMessage({searchTerm, resultsTotal, pageTotal, styles}: Props) {
  if (!searchTerm || !pageTotal) {return null;}

  return (
    <div className={styles.ResultsMessage_root}>
      <p className={styles.ResultsMessage_text}>
        Found {resultsTotal} {resultsTotal === 1 ? 'result' : 'results'} for <b>{searchTerm}</b>
      </p>
    </div>
  );
}

const styles = {
  ResultsMessage_root: () => ({
    display: 'flex',
    justifyContent: 'center',
  }),

  ResultsMessage_text: () => ({
    padding: 6,
    backgroundColor: '#fcf8bb',
    borderRadius: 8,
  }),
};

export default connect(styles)(ResultsMessage);
