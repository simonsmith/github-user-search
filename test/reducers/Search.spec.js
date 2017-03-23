import searchReducer from 'reducers/Search';

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
    it('should update the state with the userIds', () => {
      const beforeState = {
        isPending: true,
        result: [],
      };
      const action = {
        payload: {
          result: [1, 2],
          search: '?q=alecrust',
        },
        type: 'SEARCH_SUCCESS',
      };
      const afterState = searchReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {
        error: null,
        isPending: true,
      };
      const err = new Error('the server died');
      err.response = {foo: 'bar'};

      const action = {
        error: true,
        payload: err,
        type: 'SEARCH_FAILURE',
      };
      const afterState = searchReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
