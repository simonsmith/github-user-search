// @flow

import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  isPending: false,
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

    case 'SEARCH_SUCCESS': {
      const newState = assignAll([
        state,
        action.payload,
        {isPending: false, error: null},
      ]);
      return newState;
    }

    case 'SEARCH_FAILURE': {
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
