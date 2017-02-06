// @flow

import pick from 'lodash/fp/pick';
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
};

export default function searchReducer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return assignAll([
        state,
        {isPending: true},
      ]);
    case SEARCH_SUCCESS:
      return assignAll([
        state,
        pick(['result'], action),
        {
          isPending: false,
          error: null,
        },
      ]);
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
