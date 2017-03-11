// @flow

import {combineReducers} from 'redux';
import entitiesReducer from 'reducers/Entities';
import searchReducer from 'reducers/Search';
import profileReducer from 'reducers/Profile';

export default combineReducers({
  entities: entitiesReducer,
  search: searchReducer,
  profile: profileReducer,
});
