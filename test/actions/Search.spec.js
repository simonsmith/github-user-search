import configureMockStore from 'redux-mock-store';
import {
  searchForUser,
  searchSuccess,
  searchFailure,
} from 'actions/Search';

describe('Actions: search', () => {

  describe('when requesting users via a search term', () => {
    it('should dispatch a SEARCH_REQUEST action', () => {
      expect(
        searchForUser({query: 'simon'})
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

});
