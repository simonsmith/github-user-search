import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import {normalize} from 'normalizr';
import {
  repoSchema,
} from 'store/schema';

export function* getRepos(action) {
  const {payload: {url}} = action;
  try {
    const reposResponse = yield call(api.get, url, {
      params: {
        per_page: 10,
        sort: 'pushed',
      },
    });
    const data = normalize(reposResponse.data, repoSchema);
    yield put({
      type: 'REPOS_SUCCESS',
      payload: {
        entities: data.entities,
        result: data.result,
        url,
      },
    });
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'REPOS_FAILURE',
    });
  }
}

export function* watchGetRepos() {
  yield takeLatest('REPOS_REQUEST', getRepos);
}
