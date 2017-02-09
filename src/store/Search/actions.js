// @flow

import get from 'lodash/fp/get';
import {normalize} from 'normalizr';
import assignAll from 'lodash/fp/assignAll';
import pick from 'lodash/fp/pick';
import userSchema from '../schema';

function getQueryFromCache(query: string, state: Object): Array<number> | void {
  return get('search.cache', state)[query];
}

function normalizeResponse(response: Object) {
  const normalized = normalize(response.items, userSchema);
  return assignAll([
    normalized,
    pick(['total_count', 'pagination'], response),
  ]);
}

export function searchUser({query}: {query: string}) {
  return function (dispatch: Function, getState: Function, api: Object) {
    const cachedQuery = getQueryFromCache(query, getState());
    if (cachedQuery) {
      return Promise
        .resolve()
        .then(() => dispatch(searchSuccess({result: cachedQuery}, query)));
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
  const {
    result,
    entities,
    pagination,
    total_count: totalResults,
  } = response;
  return {
    entities,
    userIds: result,
    query,
    pagination,
    totalResults,
    type: SEARCH_SUCCESS,
  };
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
