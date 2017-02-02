// @flow

import pick from 'lodash/fp/pick';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import mapValues from 'lodash/fp/mapValues';

const pickUserData = flow(
  get('entities.users'),
  mapValues(
    pick([
      'login',
      'id',
      'avatar_url',
    ])
  )
);

export const SEARCH_REQUEST: string = 'SEARCH_REQUEST';
export function searchRequest({searchTerm}: {searchTerm: string}) {
  return {
    type: SEARCH_REQUEST,
    searchTerm,
  };
}

export const SEARCH_SUCCESS: string = 'SEARCH_SUCCESS';
export function searchSuccess(data: Object) {
  const {result, entities} = data;
  return {
    type: SEARCH_SUCCESS,
    users: result,
    entities,
    totalResults: result.length,
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
