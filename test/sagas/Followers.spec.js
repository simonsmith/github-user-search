import {
  getFollowers,
} from 'store/sagas/Followers';

describe('Saga: getFollowers', () => {

  describe('when requesting followers', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
      const followers = generator.next().value;
      expect(followers.CALL).toMatchSnapshot();
    });

    it('should put a success action with the normalized data', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
      const response = {
        data: [
          {id: 1, login: 'test'},
          {id: 2, login: 'hello'},
        ],
      };
      generator.next();
      const normalized = generator.next(response).value;
      expect(normalized.PUT).toMatchSnapshot();
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});
