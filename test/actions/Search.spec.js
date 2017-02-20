import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  searchUser,
  searchRequest,
  searchSuccess,
  searchFailure,
} from 'actions/Search';

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
        pagination: {},
        totalResults: 2,
        result: [123, 456],
      };
      expect(
        searchSuccess(data, 'foo')
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
      describe('and it is successful', () => {
        it('should fetch the results from the API and normalize them', () => {
          const response = {
            pagination: null,
            total_count: 2,
            items: [
              {id: 123, avatar_url: 'foo', login: 'alecrust', type: 'User'},
              {id: 456, avatar_url: 'foo', login: 'simonsmith', type: 'User'},
            ],
          };
          const mockApi = {
            searchUsers: () => Promise.resolve(response),
          };
          const mockStore = configureMockStore([
            thunk.withExtraArgument(mockApi),
          ]);
          store = mockStore({
            entities: {
              users: {},
            },
            search: {
              cache: {},
            },
          });

          return store
            .dispatch(searchUser('?q=alecrust'))
            .then(() => expect(store.getActions()).toMatchSnapshot());
        });
      });

      describe('and it exists in the cache', () => {
        it('should fetch the results from the cache and not call the API', () => {
          const spy = jest.fn();
          const mockApi = {
            searchUsers: spy,
          };
          const mockStore = configureMockStore([
            thunk.withExtraArgument(mockApi),
          ]);
          store = mockStore({
            entities: {
              users: {
                1: {id: 1, login: 'foo'},
                2: {id: 2, login: 'bar'},
              },
            },
            search: {
              result: [1],
              cache: {
                foo: {
                  result: [1, 2],
                  pagination: null,
                  totalResults: 10,
                },
              },
            },
          });

          return store
            .dispatch(searchUser('foo'))
            .then(() => {
              expect(spy).not.toHaveBeenCalled();
              return expect(store.getActions()).toMatchSnapshot();
            });
        });
      });

      describe('and it fails', () => {
        it('should send error details in the action', () => {
          const error = new Error('404');
          error.response = {
            foo: 'bar',
          };
          const mockApi = {
            searchUsers: () => Promise.reject(error),
          };
          const mockStore = configureMockStore([
            thunk.withExtraArgument(mockApi),
          ]);
          store = mockStore({
            search: {
              cache: {},
            },
            entities: {
              users: {},
            },
          });

          return store
            .dispatch(searchUser({query: 'alecrust'}))
            .then(() => expect(store.getActions()).toMatchSnapshot());
        });
      });
    });
  });

});
