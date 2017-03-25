import {
  getRepos,
} from 'store/sagas/Repos';

describe('Saga: getRepos', () => {

  describe('when requesting repos', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
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
      const normalized = generator.next(response).value;
      expect(normalized.PUT).toMatchSnapshot();
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = getRepos({payload: {url: 'repos.net'}});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});
