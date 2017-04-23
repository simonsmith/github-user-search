import {
  put,
  take,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import keys from 'lodash/fp/keys';
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import every from 'lodash/fp/every';
import flow from 'lodash/fp/flow';
import castArray from 'lodash/fp/castArray';
import api from 'store/api';

const isCachedAction = flow(
  castArray,
  every(get('meta.fromCache'))
);

export function* getRateLimit(actions) {
  if (isCachedAction(actions)) {
    const latestRateLimit = yield select(get('cache.rateLimit.latest'));
    yield put({
      payload: latestRateLimit,
      type: 'API_RATE_LIMIT_SUCCESS',
    });
    return;
  }

  try {
    const rateLimit = yield call(api.get, 'rate_limit');
    yield put({
      payload: get('data.resources', rateLimit),
      type: 'API_RATE_LIMIT_SUCCESS',
    });
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'API_RATE_LIMIT_FAILURE',
    });
  }
}

export function* watchGetRateLimit() {
  const types = [
    'REPOS_SUCCESS',
    'FOLLOWERS_SUCCESS',
    'PROFILE_SUCCESS',
  ];

  yield [
    combineLatest(types, getRateLimit),
    takeLatest('API_RATE_LIMIT_REQUEST', getRateLimit),
  ];
}

/**
 * Tracks an array of action types and only calls the saga
 * when they all fire.
 * Resets once all actions fire
 *
 * Modified from https://github.com/jhewlett/redux-saga-combine-latest
 */
function* combineLatest(types, saga) {
  let actions = {};
  const getActions = map(type => actions[type]);

  while (true) {
    const action = yield take(types);
    actions[action.type] = action;
    if (keys(actions).length === types.length) {
      yield saga(getActions(types));
      actions = {};
    }
  }
}
