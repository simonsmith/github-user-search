// @flow

import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  isPending: true,
  result: [],
  pagination: null,
  totalResults: 0,
};

export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'SEARCH_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'SEARCH_SUCCESS':
      return assignAll([
        state,
        action.payload,
        {isPending: false, error: null},
      ]);

    case 'SEARCH_FAILURE': {
      if (!action.error) {return state;}
      return assignAll([
        state,
        {
          isPending: false,
          error: action.payload,
        },
      ]);
    }

    default:
      return state;

  }
}
