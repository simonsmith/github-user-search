// @flow

import get from 'lodash/fp/get';
import {normalize} from 'normalizr';
import assignAll from 'lodash/fp/assignAll';
import userSchema from '../schema';

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

export function searchUser({query}: {query: string}) {
  return function (dispatch: Function, getState: Function, api: Object) {
    const cachedResult = get('search.cache', getState())[query];

    if (cachedResult) {
      return Promise
        .resolve()
        .then(() => dispatch(searchSuccess(cachedResult, cachedResult.query)));
    }

    dispatch(searchRequest({query}));

    return api
      .searchUsers({q: query})
      .then(normalizeResponse)
      .then(response => dispatch(searchSuccess(response, query)))
      .catch(err => dispatch(searchFailure(err)));
  };
}

export const SEARCH_REQUEST: string = 'SEARCH_REQUEST';
export function searchRequest({query}: {query: string}) {
  return {
    type: SEARCH_REQUEST,
    query,
  };
}

export const SEARCH_SUCCESS: string = 'SEARCH_SUCCESS';
export function searchSuccess(response: Object, query: string) {
  return assignAll([
    response,
    {
      type: SEARCH_SUCCESS,
      query,
    },
  ]);
}

export const SEARCH_FAILURE: string = 'SEARCH_FAILURE';
export function searchFailure(error: Object) {
  const {response, message} = error;
  return {
    type: SEARCH_FAILURE,
    response,
    message,
  };
}
