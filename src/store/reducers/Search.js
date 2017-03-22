// @flow

import assignAll from 'lodash/fp/assignAll';
import merge from 'lodash/fp/merge';
import pick from 'lodash/fp/pick';
import flow from 'lodash/fp/flow';

const initialState = {
  error: null,
  isPending: false,
  result: [],
  pagination: null,
  totalResults: 0,
};

export const pickSearchData = flow(
  pick([
    'result',
    'totalResults',
    'pagination',
  ]),
  merge({})
);


export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'SEARCH_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'SEARCH_SUCCESS': {
      const data = pickSearchData(action);
      const newState = assignAll([
        state,
        data,
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
