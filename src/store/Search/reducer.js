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
  result: [],
  pagination: null,
  totalResults: 0,
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
      const {
        result,
        totalResults,
        pagination,
        query,
      } = action;
      const newState = assignAll([
        state,
        {
          pagination,
          totalResults,
          result,
          isPending: false,
          error: null,
        },
      ]);

      if (!state.cache[query]) {
        newState.cache = assignAll([
          state.cache,
          {[query]: {
            result,
            totalResults,
            pagination,
            query,
          }},
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
