// @flow

import assignAll from 'lodash/fp/assignAll';
import pick from 'lodash/fp/pick';
import isUndefined from 'lodash/fp/isUndefined';
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

const getData = pick([
  'result',
  'totalResults',
  'pagination',
]);

export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case SEARCH_REQUEST:
      return assignAll([
        state,
        {isPending: true},
      ]);

    case SEARCH_SUCCESS: {
      const data = getData(action);
      const {query} = action;
      const newState = assignAll([
        state,
        data,
        {isPending: false, error: null},
      ]);

      if (!isUndefined(query) && !state.cache[query]) {
        newState.cache = assignAll([
          state.cache,
          {[query]: data},
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
