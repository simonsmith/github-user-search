// @flow

import watchApiSearchRequest from './Search';

export default function* rootSaga() {
  yield [
    watchApiSearchRequest(),
  ];
}
