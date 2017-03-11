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

export function* getFollowers({url}) {
  try {
    const followersResponse = yield call(api.get, url, {
      params: {
        per_page: 8,
      },
    });
    const data = normalize(followersResponse.data, userSchema);
    yield put({
      type: 'FOLLOWERS_SUCCESS',
      entities: data.entities,
      result: data.result,
    });
  } catch (err) {
    yield put({
      type: 'FOLLOWERS_FAILURE',
      message: err.message,
      response: err.response,
    });
  }
}

export function* watchGetFollowers() {
  yield takeLatest('FOLLOWERS_REQUEST', getFollowers);
}
