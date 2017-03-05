// @flow

import watchApiRequestForUser from './Search';

export default function* rootSaga() {
  yield [
    watchApiRequestForUser(),
  ];
}
