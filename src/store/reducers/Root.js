// @flow

import {combineReducers} from 'redux';
import entitiesReducer from 'reducers/Entities';
import searchReducer from 'reducers/Search';
import profileReducer from 'reducers/Profile';
import cacheReducer from 'reducers/Cache';
import reposReducer from 'reducers/Repos';
import followersReducer from 'reducers/Followers';
import rateLimitReducer from 'reducers/RateLimit';

export default combineReducers({
  cache: cacheReducer,
  entities: entitiesReducer,
  search: searchReducer,
  profile: profileReducer,
  repos: reposReducer,
  followers: followersReducer,
  rateLimit: rateLimitReducer,
});
