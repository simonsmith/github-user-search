import reposReducer from 'reducers/Repos';

describe('Reducer: repos', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        reposReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a repos request is pending', () => {
    it('should set isPending to true', () => {
      const beforeState = {
        isPending: false,
      };
      const afterState = reposReducer(beforeState, {type: 'REPOS_REQUEST'});

      expect(
        afterState
      ).toMatchSnapshot();
    });
  });

  describe('when a repos request is successful', () => {
    it('should update the state with the repos', () => {
      const beforeState = {
        isPending: true,
        result: [],
      };
      const action = {
        payload: {
          result: [1, 2, 3],
        },
        type: 'REPOS_SUCCESS',
      };
      const afterState = reposReducer(beforeState, action);

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
        type: 'REPOS_FAILURE',
      };
      const afterState = reposReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
