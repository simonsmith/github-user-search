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
      expect(afterState).not.toEqual(beforeState);
    });
  });

  describe('when a search request is successful', () => {
    it('should update the state with the payload', () => {
      const beforeState = {
        error: null,
        isPending: true,
        query: '',
        result: [],
      };
      const action = {
        entities: {},
        query: 'simon',
        type: 'SEARCH_SUCCESS',
        result: [1, 2],
      };
      const afterState = searchReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toEqual(beforeState);
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {
        error: null,
        isPending: true,
        query: '',
        result: [],
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
