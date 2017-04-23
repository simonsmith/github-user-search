import rateLimitReducer from 'reducers/RateLimit';

describe('Reducer: rateLimit', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        rateLimitReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a rate limit request is successful', () => {
    it('should update the state with the response', () => {
      const beforeState = {
        core: {},
        search: {},
      };
      const action = {
        payload: {
          core: {test: 'foo'},
          search: {test: 'bar'},
        },
        type: 'API_RATE_LIMIT_SUCCESS',
      };
      const afterState = rateLimitReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {};
      const err = new Error('the request died');
      const action = {
        error: true,
        payload: err,
        type: 'API_RATE_LIMIT_FAILURE',
      };
      const afterState = rateLimitReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
