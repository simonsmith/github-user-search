import cacheReducer from 'reducers/Cache';

describe('Reducer: cache', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        cacheReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('search cache', () => {

    describe('when a cache entry does not exist', () => {
      it('should add an entry to the cache', () => {
        const beforeState = {
          search: {},
        };
        const action = {
          type: 'SEARCH_SUCCESS',
          query: 'page=2',
          result: [1,2],
          totalResults: 2,
        };
        expect(cacheReducer(beforeState, action)).toMatchSnapshot();
      });
    });

    describe('when a cache entry does exist', () => {
      it('should just return the state', () => {
        const beforeState = {
          search: {
            'page=2': {someProp: 'test'},
          },
        };
        const action = {
          type: 'SEARCH_SUCCESS',
          query: 'page=2',
          result: [1,2],
        };
        expect(cacheReducer(beforeState, action)).toMatchSnapshot();
      });
    });

  });

});
