import {
  mapStateToProps,
} from 'containers/RateLimit/connect';

describe('RateLimitConnect: mapStateToProps', () => {

  describe('when given the state', () => {
    it.skip('should return relevant properties', () => {
      const state = {
        rateLimit: {
          core: {
            limit: 3,
            remaining: 5,
            reset: 1492972397,
          },
          search: {
            limit: 3,
            remaining: 5,
            reset: 1492972397,
          },
        },
      };
      expect(mapStateToProps(state)).toMatchSnapshot();
    });
  });

});
