// @flow

import mergeAll from 'lodash/fp/mergeAll';
import isObject from 'lodash/fp/isObject';

const initialState = {
  users: {},
};

export default function entitiesReducer(state: Object = initialState, action: Object) {
  const {entities} = action;
  if (isObject(entities)) {
    return mergeAll([state, entities]);
  }
  return state;
}
