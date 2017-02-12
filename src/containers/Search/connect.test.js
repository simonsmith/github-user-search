import {mapStateToProps} from './connect';

describe('SearchConnect: mapStateToProps', () => {

  describe('when given the state', () => {
    it('should return relevant properties', () => {
      const state = {
        search: {
          result: [1, 2, 3],
          totalResults: 10,
          pagination: {},
        },
        entities: {
          users: {
            1: {id: 1},
            2: {id: 2},
          },
        },
      };
      expect(mapStateToProps(state)).toMatchSnapshot();
    });
  });

});
