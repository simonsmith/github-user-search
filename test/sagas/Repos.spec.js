import {
  put,
} from 'redux-saga/effects';
import {
  getRepos,
} from 'store/sagas/Repos';

describe('Saga: getRepos', () => {

  describe('when no cached data exists', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
      generator.next();
      const repos = generator.next().value;
      expect(repos.CALL).toMatchSnapshot();
    });

    it('should put a success action with the normalized data', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
      const response = {
        data: [
          {id: 1, name: 'test'},
          {id: 2, name: 'hello'},
        ],
      };
      generator.next();
      generator.next();
      const normalized = generator.next(response).value;
      expect(normalized.PUT.action).toMatchSnapshot();
    });
  });

  describe('when cached data does exist', () => {
    it('should pass the result to the success action and not call the API', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
      generator.next();
      const successAction = generator.next(
        {
          result: [1, 2],
          entities: {},
        }
      ).value;

      expect(successAction).toEqual(
        put({
          meta: {fromCache: true},
          payload: {
            entities: {},
            result: [1, 2],
            url: 'repos.net',
          },
          type: 'REPOS_SUCCESS',
        })
      );
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT.action).toMatchSnapshot();
    });
  });

});
