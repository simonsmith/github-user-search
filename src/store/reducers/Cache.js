import mergeAll from 'lodash/fp/mergeAll';
import isUndefined from 'lodash/fp/isUndefined';
import get from 'lodash/fp/get';
import {pickSearchData} from 'store/reducers/Search';

const initialState = {
  search: {},
};

export function getSearchFromCache(search: string): Function {
  return get(`cache.search.${search}`);
}

export default function cacheReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'SEARCH_SUCCESS': {
      const data = pickSearchData(action);
      const cacheKey = action.query;
      const newState = mergeAll([{}, state]);
      if (!isUndefined(cacheKey) && !state.search[cacheKey]) {
        newState.search[cacheKey] = data;
      }
      return newState;
    }

    default:
      return state;

  }
}
