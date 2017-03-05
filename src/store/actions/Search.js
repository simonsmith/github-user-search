// @flow

import assignAll from 'lodash/fp/assignAll';

export function searchForUser(search: string) {
  return {
    type: 'SEARCH_REQUEST',
    search,
  };
}

export function searchSuccess(response: Object, query: string) {
  return assignAll([
    response,
    {
      type: 'SEARCH_SUCCESS',
      query,
    },
  ]);
}

export function searchFailure(error: Object) {
  const {response, message} = error;
  return {
    type: 'SEARCH_FAILURE',
    response,
    message,
  };
}
