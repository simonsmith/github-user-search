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
    <ul className={styles.root}>
      {
        map((value, key) => {
          return (
            <li
              className={styles.item}
              key={key}
            >
              <p className={styles.value}>{value}</p>
              <p className={styles.label}>{key}</p>
            </li>
          );
        }, stats)
      }
    </ul>
  );
}

const styles = {
  root: () => ({
    display: 'flex',
  }),

  item: () => ({
    marginRight: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),

  value: () => ({
    fontSize: '30px',
  }),

  label: () => ({
    fontSize: '14px',
  }),
};

export default connect(styles)(Stats);
