import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from 'store/api';
import get from 'lodash/fp/get';
import {normalize} from 'normalizr';
import assignAll from 'lodash/fp/assignAll';
import qs from 'query-string';
import {userSchema} from 'store/schema';

function normalizeResponse(response: Object) {
  const normalized = normalize(response.items, userSchema);
  const {total_count, pagination} = response;
  return assignAll([
    normalized,
    {
      totalResults: total_count,
      pagination,
    },
  ]);
}

function searchSuccessAction(response: Object, query: string) {
  const action = assignAll([
    response,
    {
      type: 'SEARCH_SUCCESS',
      query,
    },
  ]);
  return put(action);
}

export function* apiSearchRequest({search}) {
  const cachedResult = yield select(get(`search.cache.${search}`));
  if (cachedResult) {
    return yield searchSuccessAction(cachedResult, search);
  }

  try {
    const response = yield call(api.searchUsers, qs.parse(search));
    const normalizedResponse = normalizeResponse(response);
    return yield searchSuccessAction(normalizedResponse, search);
  } catch (err) {
    return yield put({
      type: 'SEARCH_FAILURE',
      message: err.message,
      response: err.response,
    });
  }
}

export default function* watchApiSearchRequest() {
  yield takeLatest('SEARCH_REQUEST', apiSearchRequest);
}
