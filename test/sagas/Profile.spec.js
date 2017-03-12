import {
  call,
  put,
} from 'redux-saga/effects';
import api from 'store/api';
import {
  getProfile,
} from 'store/sagas/Profile';

describe('Saga: getProfile', () => {

  describe('when there is an error from the request', () => {
    it('it should put an error action', () => {
      const generator = getProfile({username: 'simon'});
      generator.next();
      generator.next();
      const error = generator.throw(new Error('oh dear')).value;
      expect(error.PUT).toMatchSnapshot();
    });
  });

  describe('when no cached data exists', () => {
    it('should call the API and put a success action with the profile data', () => {
      const generator = getProfile({username: 'simonsmith'});
      generator.next();
      const apiCall = generator.next().value;
      expect(apiCall).toEqual(
        call(api.getProfile, 'simonsmith')
      );
      const response = {
        data: {
          login: 'simonsmith',
          foo: 'bar',
        },
      };
      const action = generator.next(response).value;
      expect(action.PUT).toMatchSnapshot();
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

  describe('when a cached profile does exist', () => {
    it('should pass the result to the success action and not call the API', () => {
      const generator = getProfile({username: 'simon'});
      generator.next();

      const successAction = generator.next({foo: 'bar'}).value;
      expect(successAction).toEqual(
        put({type: 'PROFILE_SUCCESS', profile: {foo: 'bar'}})
      );
    });

    it('should request additional profile data with the cached values', () => {
      const simonProfile = {repos_url: 'test.net', followers_url: 'foo.net'};
      const generator = getProfile({username: 'simon'});
      generator.next();
      generator.next(simonProfile);

      const repoRequest = generator.next().value;
      expect(repoRequest).toEqual(
        put({
          type: 'REPOS_REQUEST',
          url: 'test.net',
        })
      );

      const followerRequest = generator.next().value;
      expect(followerRequest).toEqual(
        put({
          type: 'FOLLOWERS_REQUEST',
          url: 'foo.net',
        })
      );
    });
  });

});
