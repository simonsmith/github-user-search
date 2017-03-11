import {
  call,
  put,
} from 'redux-saga/effects';
import api from 'store/api';
import {
  getProfile,
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
