import searchReducer from '../../src/store/Search/reducer';

describe('Reducer: search', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        searchReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a search request is pending', () => {
    it('should set isPending to true', () => {
      const beforeState = {
        isPending: false,
      };
      const afterState = searchReducer(beforeState, {type: 'SEARCH_REQUEST'});

      expect(
        afterState
      ).toMatchSnapshot();
    });
  });

  describe('when a search request is successful', () => {
    describe('and the query is not cached', () => {
      it('should update the state with the userIds and cache them', () => {
        const beforeState = {
          isPending: true,
          result: [],
          cache: {},
        };
        const action = {
          result: [1, 2],
          query: '?q=alecrust',
          type: 'SEARCH_SUCCESS',
        };
        const afterState = searchReducer(beforeState, action);

        expect(
          afterState
        ).toMatchSnapshot();
        expect(afterState).not.toEqual(beforeState);
      });
    });

    describe('and the query is already cached', () => {
      it('should not merge the cached query back into the cache again', () => {
        const beforeState = {
          error: null,
          isPending: true,
          result: [1, 2, 3],
          cache: {
            foo: [1, 2, 3],
          },
        };
        const action = {
          query: 'foo',
          type: 'SEARCH_SUCCESS',
          result: [44],
        };
        const afterState = searchReducer(beforeState, action);

        expect(
          afterState
        ).toMatchSnapshot();
        expect(afterState).not.toEqual(beforeState);
      });
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {
        error: null,
        isPending: true,
      };
      const action = {
        response: {},
        message: 'The server died',
        type: 'SEARCH_FAILURE',
      };
      const afterState = searchReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toEqual(beforeState);
    });
  });

});
