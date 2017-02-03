import {combineReducers} from 'redux';
import entitiesReducer from './entities';
import searchReducer from './search';

export default combineReducers({
  entities: entitiesReducer,
  search: searchReducer,
});
