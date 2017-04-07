// @flow

import {watchSearchUsers} from './Search';
import {watchGetProfile} from './Profile';
import {watchGetRepos} from './Repos';
import {watchGetFollowers} from './Followers';
import {watchGetRateLimit} from './RateLimit';

export default function* rootSaga() {
  yield [
    watchSearchUsers(),
    watchGetProfile(),
    watchGetFollowers(),
    watchGetRepos(),
    watchGetRateLimit(),
  ];
}
