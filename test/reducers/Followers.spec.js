import followersReducer from 'reducers/Followers';

describe('Reducer: followers', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        followersReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a followers request is pending', () => {
    it('should set isPending to true', () => {
      const beforeState = {
        isPending: false,
      };
      const afterState = followersReducer(beforeState, {type: 'FOLLOWERS_REQUEST'});

      expect(
        afterState
      ).toMatchSnapshot();
    });
  });

  describe('when a followers request is successful', () => {
    it('should update the state with the repos', () => {
      const beforeState = {
        isPending: true,
        result: [],
      };
      const action = {
        payload: {
          result: [1, 2, 3],
        },
        type: 'FOLLOWERS_SUCCESS',
      };
      const afterState = followersReducer(beforeState, action);

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
        type: 'FOLLOWERS_FAILURE',
      };
      const afterState = followersReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
