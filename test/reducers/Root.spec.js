import {createStore} from 'redux';
import rootReducer from 'reducers/Root';
import searchReducer from 'reducers/Search';
import entitiesReducer from 'reducers/Entities';

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
