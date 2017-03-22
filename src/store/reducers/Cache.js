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
      if (!isUndefined(cacheKey) && !state.search[cacheKey]) {
        const newState = mergeAll([{}, state]);
        newState.search[cacheKey] = data;
        return newState;
      }
      return state;
    }

    default:
      return state;

  }
}
