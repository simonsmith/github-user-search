// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  label: string,
  reset: string,
  remaining: number,
  limit: number,
};

export function calculateRemainingColor(remaining: number, limit: number): string {
  if (remaining <= (limit / 4) * 1) {
    return 'RateLimit_low';
  }
  if (remaining <= (limit / 4) * 3) {
    return 'RateLimit_medium';
  }
  return 'RateLimit_high';
}

export default function RateLimit({label, remaining, limit, reset}: Props) {
  const styleKey = calculateRemainingColor(remaining, limit);
  return (
    <p
      className={`${css(styles.RateLimit)} u-flex`}
      title={`Limit resets at ${reset}`}
    >
      <span className={css(styles.RateLimit_label)}>{label}:</span>
      <span className={css(styles[styleKey])}>{remaining}</span>
    </p>
  );
}

RateLimit.defaultProps = {
  remaining: 0,
  limit: 0,
  reset: '',
};

const styles = StyleSheet.create({
  RateLimit: {
    fontSize: 14,
  },

  RateLimit_label: {
    marginRight: 3,
  },

  RateLimit_high: {
    color: '#10ce65',
  },

  RateLimit_medium: {
    color: '#f5f758',
  },

  RateLimit_low: {
    color: '#d6495d',
  },
});
