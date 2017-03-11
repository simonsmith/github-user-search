
import assignAll from 'lodash/fp/assignAll';
import pick from 'lodash/fp/pick';
import isUndefined from 'lodash/fp/isUndefined';

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

    case 'SEARCH_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'SEARCH_SUCCESS': {
      const data = getData(action);
      const cacheKey = action.query;
      const newState = assignAll([
        state,
        data,
        {isPending: false, error: null},
      ]);

      if (!isUndefined(cacheKey) && !state.cache[cacheKey]) {
        newState.cache[cacheKey] = data;
      }

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
