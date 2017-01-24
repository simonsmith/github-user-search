// @flow

import map from 'lodash/fp/map';
import pick from 'lodash/fp/pick';

export const USER_SEARCH_REQUEST: string = 'USER_SEARCH_REQUEST';
export function userSearchRequest({searchTerm}: {searchTerm: string}) {
  return {
    type: USER_SEARCH_REQUEST,
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
export const USER_SEARCH_SUCCESS: string = 'USER_SEARCH_SUCCESS';
export function userSearchSuccess(response: Object) {
  const {data} = response;
  return {
    type: USER_SEARCH_SUCCESS,
    users: pickUserData(data),
    totalResults: data.length,
  };
}

export const USER_SEARCH_FAILURE: string = 'USER_SEARCH_FAILURE';
export function userSearchFailure(error: Object) {
  const {response, message} = error;
  return {
    type: USER_SEARCH_FAILURE,
    response,
    message,
  };
}
