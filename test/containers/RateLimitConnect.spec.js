import {
  mapStateToProps,
} from 'containers/RateLimit/connect';
import MockDate from 'mockdate';

describe('RateLimitConnect: mapStateToProps', () => {

  beforeAll(() => {
    MockDate.set(new Date('2017-04-23T09:00:00Z'), -60);
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe('when given the state', () => {
    it('should return relevant properties', () => {
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
