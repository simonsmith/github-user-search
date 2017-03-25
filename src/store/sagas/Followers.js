import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import {normalize} from 'normalizr';
import {
  userSchema,
} from 'store/schema';

export function* getFollowers(action) {
  const {payload: {url}} = action;
  try {
    const followersResponse = yield call(api.get, url, {
      params: {
        per_page: 8,
      },
    });
    const data = normalize(followersResponse.data, userSchema);
    yield put({
      payload: {
        entities: data.entities,
        result: data.result,
      },
      type: 'FOLLOWERS_SUCCESS',
    });
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
