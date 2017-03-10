import {
  call,
  put,
} from 'redux-saga/effects';
import api from 'store/api';
import {
  getProfile,
  getRepos,
  getFollowers,
} from 'store/sagas/Profile';

describe('Saga: getProfile', () => {

  describe('when no cached data exists', () => {
    it('should call the API and put a success action with the profile data', () => {
      const generator = getProfile({username: 'simonsmith'});
      const profile = generator.next().value;
      expect(profile).toEqual(
        call(api.getProfile, 'simonsmith')
      );
    });

    it('should put actions for repos and followers', () => {
      const response = {
        data: {
          login: 'simonsmith',
          followers_url: 'followers.net',
          repos_url: 'repos.net',
        },
      };
      const generator = getProfile({username: 'simonsmith'});
      generator.next();
      generator.next(response);

      const repoRequestAction = generator.next().value;
      expect(repoRequestAction).toEqual(
        put({type: 'REPOS_REQUEST', url: 'repos.net'})
      );

      const followerRequestAction = generator.next().value;
      expect(followerRequestAction).toEqual(
        put({type: 'FOLLOWERS_REQUEST', url: 'followers.net'})
      );
    });
  });

});

describe('Saga: getFollowers', () => {

  describe('when requesting followers', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getFollowers({url: 'followers.net'});
      const followers = generator.next().value;
      expect(followers.CALL).toMatchSnapshot();
    });

    it('should put a success action with the normalized data', () => {
      const generator = getFollowers({url: 'followers.net'});
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
      const generator = getFollowers({url: 'followers.net'});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});

describe('Saga: getRepos', () => {

  describe('when requesting repos', () => {
    it('should call the API with the url and parameters', () => {
      const generator = getRepos({url: 'repos.net'});
      const repos = generator.next().value;
      expect(repos.CALL).toMatchSnapshot();
    });

    it('should put a success action with the normalized data', () => {
      const generator = getRepos({url: 'repos.net'});
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
      const generator = getRepos({url: 'repos.net'});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});
