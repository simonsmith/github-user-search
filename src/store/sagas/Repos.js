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

export function* getRepos({url}) {
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
      url,
      entities: data.entities,
      result: data.result,
    });
  } catch (err) {
    yield put({
      type: 'REPOS_FAILURE',
      message: err.message,
      response: err.response,
    });
  }
}

export function* watchGetRepos() {
  yield takeLatest('REPOS_REQUEST', getRepos);
}
