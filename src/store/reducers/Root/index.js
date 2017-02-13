// @flow

import {combineReducers} from 'redux';
import entitiesReducer from '../Entities';
import searchReducer from '../Search';

export default combineReducers({
  entities: entitiesReducer,
  search: searchReducer,
});
