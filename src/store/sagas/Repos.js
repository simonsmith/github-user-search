import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import {normalize} from 'normalizr';
import {
  repoSchema,
} from 'store/schema';
import {getReposFromCache} from 'store/reducers/Cache';

function reposSuccessAction(data: Object, url: string) {
  return put({
    type: 'REPOS_SUCCESS',
    payload: {
      entities: data.entities,
      result: data.result,
      url,
    },
  });
}

export function* getRepos(action) {
  const {payload: {url}} = action;
  const cachedRepos = yield select(getReposFromCache(url));

  if (cachedRepos) {
    yield reposSuccessAction(cachedRepos, url);
    return;
  }

  try {
    const reposResponse = yield call(api.get, url, {
      params: {
        per_page: 6,
        sort: 'pushed',
      },
    });
    const data = normalize(reposResponse.data, repoSchema);
    yield reposSuccessAction(data, url);
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
