import entitiesReducer from '../../src/reducers/entities';

describe('Reducer: entities', () => {

  describe('when passed no state', () => {
    it('should return the initial state', () => {
      expect(
        entitiesReducer(undefined, {})
      ).toMatchSnapshot();
    });
  });

  describe('when action has an entities property', () => {
    it('should merge the object into the state', () => {
      const action = {
        entities: {
          users: {
            123: {name: 'bar'},
            456: {name: 'foo'},
          },
        },
      };
      const initial = {
        users: {
          789: {name: 'baz'},
        },
        other: {foo: 'bar'},
      };
      expect(
        entitiesReducer(initial, action)
      ).toMatchSnapshot();
    });
  });

});
