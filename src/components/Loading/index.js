// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';
import LoadingSpinner from './loading.svg';

export default function Loading() {
  return (
    <div className={`${css(styles.Loading)} u-flex u-flexJustifyCenter u-flexAlignItemsCenter`}>
      <LoadingSpinner width={34} height={34} />
    </div>
  );
}

const styles = StyleSheet.create({
  Loading: {
    marginTop: 25,
  },
});
