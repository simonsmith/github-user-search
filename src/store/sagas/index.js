// @flow

import watchSearchUsers from './Search';
import watchGetProfile from './Profile';

export default function* rootSaga() {
  yield [
    watchSearchUsers(),
    watchGetProfile(),
  ];
}
