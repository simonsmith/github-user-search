import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import {normalize} from 'normalizr';
import {
  userSchema,
} from 'store/schema';
import {getFollowersFromCache} from 'store/reducers/Cache';

function followersSuccessAction(data: Object, url: string, {fromCache = false} = {}) {
  return put({
    type: 'FOLLOWERS_SUCCESS',
    meta: {fromCache},
    payload: {
      entities: data.entities,
      result: data.result,
      url,
    },
  });
}

export function* getFollowers(action) {
  const {payload: {url}} = action;
  const cachedFollowers = yield select(getFollowersFromCache(url));

  if (cachedFollowers) {
    yield followersSuccessAction(cachedFollowers, url, {fromCache: true});
    return;
  }

  try {
    const followersResponse = yield call(api.get, url, {
      params: {
        per_page: 8,
      },
    });
    const data = normalize(followersResponse.data, userSchema);
    yield followersSuccessAction(data, url);
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'FOLLOWERS_FAILURE',
    });
  }
}

export function* watchGetFollowers() {
  yield takeLatest('FOLLOWERS_REQUEST', getFollowers);
}
