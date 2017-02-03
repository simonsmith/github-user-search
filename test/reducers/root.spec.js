import {createStore} from 'redux';
import rootReducer from '../../src/reducers/root';
import searchReducer from '../../src/reducers/search';
import entitiesReducer from '../../src/reducers/entities';

describe('Reducer: root', () => {

  describe('when called with no state', () => {
    it('should return the initial state from child reducers', () => {
      const store = createStore(rootReducer);
      expect(store.getState().entities).toEqual(entitiesReducer(undefined, {}));
      expect(store.getState().search).toEqual(searchReducer(undefined, {}));
    });
  });

  describe('when called with a search action', () => {
    it('should delegate to the search reducer', () => {
      const store = createStore(rootReducer);
      const action = {type: 'SEARCH_REQUEST', query: 'test'};
      store.dispatch(action);
      expect(store.getState().search).toEqual(searchReducer(undefined, action));
    });
  });

});
