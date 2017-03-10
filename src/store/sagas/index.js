// @flow

import watchApiSearchRequest from './Search';
import watchProfileRequest from './Profile';

export default function* rootSaga() {
  yield [
    watchApiSearchRequest(),
    watchProfileRequest(),
  ];
}
