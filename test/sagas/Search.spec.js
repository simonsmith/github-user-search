import {
  call,
  put,
} from 'redux-saga/effects';
import api from 'store/api';
import {
  searchUsers,
} from 'store/sagas/Search';

describe('Saga: searchUsers', () => {

  describe('when a cached result exists', () => {
    it('should yield the result and return', () => {
      const generator = searchUsers({search: 'q=simon'});
      const store = {
        search: {
          cache: {
            'q=simon': 'test',
          },
        },
      };
      const selectAction = generator.next().value;
      expect(selectAction.SELECT.selector(store)).toEqual('test');

      const successAction = generator.next({data: 'foo'}).value;
      expect(successAction).toEqual(
        put({data: 'foo', type: 'SEARCH_SUCCESS', query: 'q=simon'})
      );
    });
  });

  describe('when no cached data exists', () => {
    it('should call the API and normalize the data', () => {
      const generator = searchUsers({search: 'q=simon'});
      generator.next();
      const apiCall = generator.next().value;
      expect(apiCall).toEqual(
        call(api.searchUsers, {q: 'simon'})
      );

      const response = {
        pagination: null,
        total_count: 2,
        items: [
          {id: 123, avatar_url: 'foo', login: 'alecrust', type: 'User'},
          {id: 456, avatar_url: 'foo', login: 'simonsmith', type: 'User'},
        ],
      };
      const successAction = generator.next(response).value;
      expect(successAction.PUT).toMatchSnapshot();
    });
  });

  describe('when a request to the API fails', () => {
    it('should call a failure action', () => {
      const generator = searchUsers({search: 'q=simon'});
      const apiError = new Error('it went wrong');
      apiError.response = 'test';

      generator.next();
      generator.next();
      const errorAction = generator.throw(apiError).value;
      expect(errorAction.PUT).toMatchSnapshot();
    });
  });

});
