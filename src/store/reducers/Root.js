// @flow

import {combineReducers} from 'redux';
import entitiesReducer from 'reducers/Entities';
import searchReducer from 'reducers/Search';
import profileReducer from 'reducers/Profile';
import cacheReducer from 'reducers/Cache';

export default combineReducers({
  cache: cacheReducer,
  entities: entitiesReducer,
  search: searchReducer,
  profile: profileReducer,
});
