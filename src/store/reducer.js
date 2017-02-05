// @flow

import {combineReducers} from 'redux';
import entitiesReducer from './Entities/reducer';
import searchReducer from './Search/reducer';

export default combineReducers({
  entities: entitiesReducer,
  search: searchReducer,
});
