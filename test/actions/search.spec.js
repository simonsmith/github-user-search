import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  searchUser,
  searchRequest,
  searchSuccess,
  searchFailure,
} from '../../src/store/Search/actions';

describe('Actions: search', () => {

  describe('when requesting users via a search term', () => {
    it('should dispatch a SEARCH_REQUEST action', () => {
      expect(
        searchRequest({query: 'simon'})
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
        searchSuccess('query', data)
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
        searchFailure(error)
      ).toMatchSnapshot();
    });
  });

  describe('Fetching users', () => {
    let store;

    afterEach(() => {
      store.clearActions();
    });

    describe('when making a request with a search term', () => {
      it('should fetch the results from the API and normalize them', () => {
        const response = {
          data: [
            {id: 123, avatar_url: 'foo', login: 'alecrust', type: 'User'},
            {id: 456, avatar_url: 'foo', login: 'simonsmith', type: 'User'},
          ],
        };
        const mockApi = {
          search: () => ({
            forUsers: () => Promise.resolve(response),
          }),
        };
        const mockStore = configureMockStore([
          thunk.withExtraArgument(mockApi),
        ]);
        store = mockStore({
          entities: {
            users: {},
          },
        });

        return store
          .dispatch(searchUser({query: 'alecrust'}))
          .then(() => expect(store.getActions()).toMatchSnapshot());
      });
    });

    describe('when the same request is made again', () => {
      it('should use the cached results and not call the API', (done) => {
        const searchSpy = jest.fn();
        const mockApi = {
          search: searchSpy,
        };
        const mockStore = configureMockStore([
          thunk.withExtraArgument(mockApi),
        ]);
        store = mockStore({
          search: {
            query: 'alecrust',
            result: [123],
          },
          entities: {
            users: {
              123: {id: 123, login: 'alecrust'},
            },
          },
        });

        return store
          .dispatch(searchUser({query: 'alecrust'}))
          .then(() => {
            expect(store.getActions()).toMatchSnapshot();
            expect(searchSpy).not.toHaveBeenCalled();
            done();
          });
      });
    });

  });

});
