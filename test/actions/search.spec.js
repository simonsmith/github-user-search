import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/actions/search';

describe('Actions: search', () => {

  describe('when requesting users via a search term', () => {
    it('should dispatch a SEARCH_REQUEST action', () => {
      expect(
        actions.searchRequest({query: 'simon'})
      ).toMatchSnapshot();
    });
  });

  describe('when receiving a set of users', () => {
    it('should dispatch a SEARCH_SUCCESS action with the necessary data', () => {
      const data = {
        entities: {
          users: {
            123: {login: 'foo', id: 123, other: 'test'},
            456: {login: 'baz', id: 456, other: 'test'},
          },
        },
        result: [123, 456],
      };
      expect(
        actions.searchSuccess(data)
      ).toMatchSnapshot();
    });
  });

  describe('when an error occurs during a request', () => {
    it('should dispatch a SEARCH_FAILURE action', () => {
      const error = new Error('something broke');
      error.response = {
        statusText: '404',
      };
      expect(
        actions.searchFailure(error)
      ).toMatchSnapshot();
    });
  });

  describe('Fetching users', () => {
    let store;
    let mockStore;

    beforeEach(() => {
      mockStore = configureMockStore([thunk]);
    });

    afterEach(() => {
      store.clearActions();
    });

    describe('when making a request with a search term', () => {
      it('should fetch the results from the API and normalize them', () => {
        jest.mock('github-api');
        store = mockStore({
          entities: {
            users: {},
          },
        });

        return store
          .dispatch(actions.searchUser({query: 'alecrust'}))
          .then(() => expect(store.getActions()).toMatchSnapshot());
      });
    });

  });

});
