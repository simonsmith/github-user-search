import cacheReducer from 'reducers/Cache';

describe('Reducer: cache', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        cacheReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

});
