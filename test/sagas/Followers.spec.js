import {
  getFollowers,
} from 'store/sagas/Followers';
import {
  put,
} from 'redux-saga/effects';

describe('Saga: getFollowers', () => {

  describe('when no cached data exists', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
      generator.next();
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
      generator.next();
      const normalized = generator.next(response).value;
      expect(normalized.PUT.action).toMatchSnapshot();
    });
  });

  describe('when cached data does exist', () => {
    it('should pass the result to the success action and not call the API', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
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
            url: 'followers.net',
          },
          type: 'FOLLOWERS_SUCCESS',
        })
      );
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = getFollowers({payload: {url: 'followers.net'}});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});
