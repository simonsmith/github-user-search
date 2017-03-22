import mergeAll from 'lodash/fp/mergeAll';
import isUndefined from 'lodash/fp/isUndefined';
import get from 'lodash/fp/get';
import {pickSearchData} from 'store/reducers/Search';

const initialState = {
  search: {},
};

function addToCache({state, cacheKey, type, data}) {
  if (isUndefined(cacheKey) || state[type][cacheKey]) {
    return state;
  }
  const newState = mergeAll([{}, state]);
  newState[type][cacheKey] = data;
  return newState;
}

export function getSearchFromCache(search: string): Function {
  return get(`cache.search.${search}`);
}

export default function cacheReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'SEARCH_SUCCESS': {
      return addToCache({
        state,
        cacheKey: action.query,
        type: 'search',
        data: pickSearchData(action),
      });
    }

    default:
      return state;

  }
}
