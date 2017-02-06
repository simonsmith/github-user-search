// @flow

import pick from 'lodash/fp/pick';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import mapValues from 'lodash/fp/mapValues';
import assignAll from 'lodash/fp/assignAll';
import {normalize} from 'normalizr';
import userListSchema from '../schema';

const getUserEntities = get('entities.users');
const getSearchState = get('search');
const getSearchQuery = flow(
  getSearchState,
  get('query')
);

const pickUserData = flow(
  getUserEntities,
  mapValues(
    pick([
      'login',
      'id',
      'avatar_url',
    ])
  )
);

function createEntitiesObject(users: Object) {
  return {
    entities: {users},
  };
}

function transformEntities(data) {
  return assignAll([
    data,
    flow(pickUserData, createEntitiesObject)(data),
  ]);
}

function getCachedResults(dispatch, query, state) {
  const searchState = getSearchState(state);
  const payload = assignAll([
    searchState,
    flow(getUserEntities, createEntitiesObject)(state),
  ]);

  return Promise
    .resolve()
    .then(() => dispatch(searchSuccess(query, payload)));
}

export function searchUser({query}: {query: string}) {
  return function (dispatch: Function, getState: Function, api: Object) {
    const state = getState();
    const lastQuery = getSearchQuery(state);

    dispatch(searchRequest({query}));

    if (lastQuery === query) {
      return getCachedResults(dispatch, query, state);
    }

    return api
      .search({q: query})
      .forUsers()
      .then(response => normalize(response.data, userListSchema))
      .then(transformEntities)
      .then(response => dispatch(searchSuccess(query, response)))
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
export function searchSuccess(query: string, data: Object) {
  const {result, entities} = data;
  return {
    entities,
    query,
    type: SEARCH_SUCCESS,
    result,
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
