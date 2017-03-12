import profileReducer, {
  getFromCache,
} from 'reducers/Profile';

describe('Reducer: profile', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        profileReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when a profile request is pending', () => {
    it('should set isPending to true', () => {
      const beforeState = {
        isPending: false,
      };
      const afterState = profileReducer(beforeState, {type: 'PROFILE_REQUEST'});

      expect(
        afterState
      ).toMatchSnapshot();
    });
  });

  describe('when a profile request is successful', () => {
    describe('and the request is not cached', () => {
      it('should update the state with the userProfile and cache it', () => {
        const beforeState = {
          isPending: true,
          userProfile: {},
          cache: {},
        };
        const action = {
          profile: {
            login: 'simonsmith',
            name: 'Simon Smith',
          },
          type: 'PROFILE_SUCCESS',
        };
        const afterState = profileReducer(beforeState, action);

        expect(
          afterState
        ).toMatchSnapshot();
        expect(afterState).not.toBe(beforeState);
      });
    });

    describe('and the query is already cached', () => {
      it('should not merge the cached query back into the cache again', () => {
        const beforeState = {
          error: null,
          isPending: true,
          userProfile: {
            login: 'simonsmith',
          },
          cache: {
            simonsmith: {login: 'simonsmith'},
          },
        };
        const action = {
          profile: {login: 'simonsmith', test: 'foo'},
          type: 'PROFILE_SUCCESS',
        };
        const afterState = profileReducer(beforeState, action);

        expect(
          afterState
        ).toMatchSnapshot();
        expect(afterState).not.toBe(beforeState);
      });
    });
  });

  describe('when a search request fails', () => {
    it('should update the state with the error message', () => {
      const beforeState = {
        error: null,
        isPending: true,
      };
      const action = {
        response: {},
        message: 'The server died',
        type: 'PROFILE_FAILURE',
      };
      const afterState = profileReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

  describe('getFromCache selector', () => {
    it('should return the cached value', () => {
      const store = {
        profile: {
          cache: {
            simon: {foo: 'bar'},
          },
        },
      };
      expect(getFromCache('simon')(store)).toEqual({foo: 'bar'});
    });
  });

});
