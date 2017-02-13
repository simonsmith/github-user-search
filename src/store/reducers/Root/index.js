// @flow

import {combineReducers} from 'redux';
import entitiesReducer from 'reducers/Entities';
import searchReducer from 'reducers/Search';

export default combineReducers({
  entities: entitiesReducer,
  search: searchReducer,
});
