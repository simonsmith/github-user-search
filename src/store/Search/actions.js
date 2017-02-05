// @flow

import pick from 'lodash/fp/pick';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import mapValues from 'lodash/fp/mapValues';
import GitHub from 'github-api';
import {normalize} from 'normalizr';
import userListSchema from '../schema';

const gh = new GitHub();

const getUserState = get('entities.users');
const pickUserData = flow(
  getUserState,
  mapValues(
    pick([
      'login',
      'id',
      'avatar_url',
    ])
  )
);

export function searchUser({query}: {query: string}) {
  return function (dispatch: Function) {
    dispatch(searchRequest({query}));

    return gh
      .search({q: query})
      .forUsers()
      .then((response) => {
        const normalizedData = normalize(response.data, userListSchema);
        // Only take the properties of each user that are needed
        const entities = {
          users: pickUserData(normalizedData),
        };
        normalizedData.entities = entities;
        return dispatch(searchSuccess(query, normalizedData));
      })
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
    totalResults: result.length,
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
