// @flow

import mergeAll from 'lodash/fp/mergeAll';
import isObject from 'lodash/fp/isObject';
import get from 'lodash/fp/get';

const initialState = {
  users: {},
  repos: {},
};

export default function entitiesReducer(state: Object = initialState, action: Object) {
  const entities = get('payload.entities', action);
  if (isObject(entities)) {
    return mergeAll([state, entities]);
  }
  return state;
}
