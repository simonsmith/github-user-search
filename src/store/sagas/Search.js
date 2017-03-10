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
import {
  searchSuccess,
  searchFailure,
} from 'actions/Search';

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

export function* apiSearchRequest({search}) {
  const cachedResult = yield select(get(`search.cache.${search}`));
  if (cachedResult) {
    return yield put(searchSuccess(cachedResult, search));
  }

  try {
    const response = yield call(api.searchUsers, qs.parse(search));
    const normalizedResponse = normalizeResponse(response);
    return yield put(searchSuccess(normalizedResponse, search));
  } catch (err) {
    return yield put(searchFailure(err));
  }
}

export default function* watchApiSearchRequest() {
  yield takeLatest('SEARCH_REQUEST', apiSearchRequest);
}
