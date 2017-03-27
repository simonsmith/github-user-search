import cacheReducer, {addToCache} from 'reducers/Cache';

describe('Reducer: cache', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        cacheReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('addToCache function', () => {

    describe('when a cache entry does not exist', () => {
      it('should add an entry to the cache', () => {
        const state = {
          foo: {},
        };
        const newState = addToCache({
          state,
          cacheKey: 'thing',
          type: 'foo',
          data: {bar: 'baz'},
        });
        expect(newState).toMatchSnapshot();
      });
    });

    describe('when the cacheKey is undefined', () => {
      it('should just return the state', () => {
        const state = {
          foo: {
            exists: 'hi',
          },
        };
        const newState = addToCache({
          state,
          cacheKey: undefined,
          type: 'foo',
          data: {bar: 'baz'},
        });
        expect(newState).toMatchSnapshot();
      });
    });

    describe('when a cache entry does exist', () => {
      it('should just return the state', () => {
        const state = {
          foo: {
            exists: 'hi',
          },
        };
        const newState = addToCache({
          state,
          cacheKey: 'exists',
          type: 'foo',
          data: {bar: 'baz'},
        });
        expect(newState).toMatchSnapshot();
      });
    });

  });

  describe('followers cache', () => {
    it('should add an entry to the cache', () => {
      const beforeState = {
        followers: {},
      };
      const action = {
        type: 'FOLLOWERS_SUCCESS',
        payload: {
          entities: 'ignore',
          result: [1, 2],
          url: 'followers.net',
        },
      };
      expect(cacheReducer(beforeState, action)).toMatchSnapshot();
    });
  });

  describe('repos cache', () => {
    it('should add an entry to the cache', () => {
      const beforeState = {
        repos: {},
      };
      const action = {
        type: 'REPOS_SUCCESS',
        payload: {
          entities: 'ignore',
          result: [1, 2],
          url: 'repos.net',
        },
      };
      expect(cacheReducer(beforeState, action)).toMatchSnapshot();
    });
  });

  describe('search cache', () => {
    it('should add an entry to the cache', () => {
      const beforeState = {
        search: {},
      };
      const action = {
        type: 'SEARCH_SUCCESS',
        payload: {
          entities: 'ignore',
          search: 'page=2',
          result: [1, 2],
          totalResults: 2,
        },
      };
      expect(cacheReducer(beforeState, action)).toMatchSnapshot();
    });
  });

  describe('profile cache', () => {
    it('should add an entry to the cache', () => {
      const beforeState = {
        profile: {},
      };

      const action = {
        type: 'PROFILE_SUCCESS',
        payload: {
          login: 'simonsmith',
          name: 'Simon Smith',
        },
      };
      expect(cacheReducer(beforeState, action)).toMatchSnapshot();
    });
  });

});
