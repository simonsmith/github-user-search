// @flow

import map from 'lodash/fp/map';
import pick from 'lodash/fp/pick';

export const SEARCH_REQUEST: string = 'SEARCH_REQUEST';
export function searchRequest({searchTerm}: {searchTerm: string}) {
  return {
    type: SEARCH_REQUEST,
    searchTerm,
  };
}

const pickUserData = map(
  pick([
    'login',
    'id',
    'avatar_url',
  ])
);
export const SEARCH_SUCCESS: string = 'SEARCH_SUCCESS';
export function searchSuccess(response: Object) {
  const {data} = response;
  return {
    type: SEARCH_SUCCESS,
    users: pickUserData(data),
    totalResults: data.length,
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
