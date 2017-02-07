import {mapStateToProps} from '../../src/containers/SearchConnect';

describe('SearchConnect: mapStateToProps', () => {

  describe('when given the state', () => {
    it('should return relevant properties', () => {
      const state = {
        search: {
          result: [1, 2, 3],
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
