import entitiesReducer from 'reducers/Entities';

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
        payload: {
          entities: {
            users: {
              123: {name: 'bar'},
              456: {name: 'foo'},
            },
          },
        },
      };
      const beforeState = {
        users: {
          789: {name: 'baz'},
        },
        other: {foo: 'bar'},
      };
      const afterState = entitiesReducer(beforeState, action);

      expect(
        afterState
      ).toMatchSnapshot();
      expect(afterState).not.toBe(beforeState);
    });
  });

});
