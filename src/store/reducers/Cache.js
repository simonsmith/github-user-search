import mergeAll from 'lodash/fp/mergeAll';
import isUndefined from 'lodash/fp/isUndefined';
import get from 'lodash/fp/get';
import {pickSearchData} from 'store/reducers/Search';

const initialState = {
  search: {},
  profile: {},
};

export function addToCache({state, cacheKey, type, data}) {
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

export function getProfileFromCache(username: string): Function {
  return get(`cache.profile.${username}`);
}

export default function cacheReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'SEARCH_SUCCESS':
      return addToCache({
        state,
        cacheKey: action.query,
        type: 'search',
        data: pickSearchData(action),
      });

    case 'PROFILE_SUCCESS':
      return addToCache({
        state,
        cacheKey: action.profile.login,
        type: 'profile',
        data: action.profile,
      });


    default:
      return state;

  }
}
