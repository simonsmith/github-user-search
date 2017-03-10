import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';
import api from 'store/api';
import {normalize} from 'normalizr';
import {
  userSchema,
  repoSchema,
} from 'store/schema';

const pickProfileData = flow(
  get('data'),
  pick([
    'avatar_url',
    'bio',
    'blog',
    'company',
    'followers',
    'following',
    'html_url',
    'login',
    'location',
    'name',
    'public_gists',
    'public_repos',
  ])
);

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

export function* getProfile({username}) {
  try {
    const profile = yield call(api.getProfile, username);
    yield put({type: 'PROFILE_SUCCESS', profile: pickProfileData(profile)});
    const {followers_url, repos_url} = profile.data;

    yield put({
      type: 'REPOS_REQUEST',
      url: repos_url,
    });
    yield put({
      type: 'FOLLOWERS_REQUEST',
      url: followers_url,
    });
  } catch (err) {
    yield put({
      type: 'PROFILE_FAILURE',
      message: err.message,
      response: err.response,
    });
  }
}

export default function* watchGetProfile() {
  yield takeLatest('PROFILE_REQUEST', getProfile);
  yield takeLatest('FOLLOWERS_REQUEST', getFollowers);
  yield takeLatest('REPOS_REQUEST', getRepos);
}
