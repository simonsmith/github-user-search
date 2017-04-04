import {
  mapDispatchToProps,
  mapStateToProps,
} from 'containers/Profile/connect';
import {isFSA} from 'flux-standard-action';

describe('ProfileConnect: mapDispatchToProps', () => {

  describe('when dispatching an action', () => {
    it('should conform to FSA', () => {
      const fakeDispatch = jest.fn();
      mapDispatchToProps(fakeDispatch).getProfile('simonsmith');
      expect(isFSA(fakeDispatch.mock.calls[0][0])).toBeTruthy();
    });

    it('should ignore undefined arguments', () => {
      const fakeDispatch = jest.fn();
      expect(mapDispatchToProps(fakeDispatch).getProfile()).toBeUndefined();
    });
  });

});

describe('ProfileConnect: mapStateToProps', () => {

  describe('when given the state', () => {
    it('should return relevant properties', () => {
      const state = {
        repos: {
          result: [1, 2, 3],
          isPending: false,
        },
        followers: {
          result: [4, 5, 6],
          isPending: false,
        },
        profile: {
          userProfile: {},
          isPending: false,
        },
        entities: {
          repos: {
            1: {id: 1},
            2: {id: 2},
          },
          users: {
            4: {id: 4},
            5: {id: 5},
          },
        },
      };
      expect(mapStateToProps(state)).toMatchSnapshot();
    });
  });

});
