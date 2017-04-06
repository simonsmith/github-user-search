// @flow

import {watchSearchUsers} from './Search';
import {watchGetProfile} from './Profile';
import {watchGetRepos} from './Repos';
import {watchGetFollowers} from './Followers';

export default function* rootSaga() {
  yield [
    watchSearchUsers(),
    watchGetProfile(),
    watchGetFollowers(),
    watchGetRepos(),
  ];
}

// function* watchTwo() {
//   while (true) {
//     const t = yield take(['FOLLOWERS_SUCCESS', 'REPOS_SUCCESS']);
//     console.log(t);
//   }
// }
