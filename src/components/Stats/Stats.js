// @flow

import React from 'react';
import {connect} from 'react-fela';

const map = require('lodash/fp/map').convert({cap: false});

type Props = {
  stats: Object,
  styles: any,
};

function Stats({stats, styles}: Props) {
  return (
    <ul className={styles.Stats_root}>
      {
        map((value, key) => {
          return (
            <li
              className={styles.Stats_item}
              key={key}
            >
              <p className={styles.Stats_value}>{value}</p>
              <p className={styles.Stats_label}>{key}</p>
            </li>
          );
        }, stats)
      }
    </ul>
  );
}

const styles = {
  Stats_root: () => ({
    display: 'flex',
  }),

  Stats_item: () => ({
    marginRight: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),

  Stats_value: () => ({
    fontSize: '30px',
  }),

  Stats_label: () => ({
    fontSize: '14px',
  }),
};

export default connect(styles)(Stats);
