// @flow

import React from 'react';
import 'suitcss-utils-flex/lib/flex.css';
import LoadingSpinner from './loading.svg';

export default function Loading() {
  return (
    <div className="u-flex u-flexJustifyCenter u-flexAlignItemsCenter">
      <LoadingSpinner width={34} height={34} />
    </div>
  );
}
