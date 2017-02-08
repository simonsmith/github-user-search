// @flow

import assignAll from 'lodash/fp/assignAll';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from './actions';

const initialState = {
  error: null,
  isPending: false,
  userIds: [],
  cache: {},
};

export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return assignAll([
        state,
        {isPending: true},
      ]);
    case SEARCH_SUCCESS: {
      const {userIds, query} = action;
      const newState = assignAll([
        state,
        {
          userIds,
          isPending: false,
          error: null,
        },
      ]);
      if (!state.cache[query]) {
        newState.cache = assignAll([
          state.cache,
          {[query]: userIds},
        ]);
      }
      return newState;
    }
    case SEARCH_FAILURE: {
      const {response, message} = action;
      return assignAll([
        state,
        {
          isPending: false,
          error: {
            response,
            message,
          },
        },
      ]);
    }
    default:
      return state;
  }
}
