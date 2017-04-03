// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';

const map = require('lodash/fp/map').convert({cap: false});

type Props = {
  stats: Object,
};

const renderStat = map((value, key) => {
  return (
    <li
      className={`${css(styles.Stats_item)} u-flex u-flexCol u-flexAlignItemsCenter`}
      key={key}
    >
      <p className={css(styles.Stats_value)}>{value}</p>
      <p className={css(styles.Stats_label)}>{key}</p>
    </li>
  );
});

export default function Stats({stats}: Props) {
  return (
    <ul className="u-flex">
      {renderStat(stats)}
    </ul>
  );
}

const styles = StyleSheet.create({
  Stats_item: {
    marginRight: 28,
  },

  Stats_value: {
    fontSize: 30,
  },

  Stats_label: {
    fontSize: 14,
  },
});
