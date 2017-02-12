import React from 'react';
import {shallow} from 'enzyme';
import SearchScreen from './';
import SearchContainer from '../../containers/Search';

describe('Screen: SearchScreen', () => {

  describe('when passed a location object', () => {
    it('should parse the searchTerm and pass it to SearchContainer', () => {
      const location = {
        search: '?q=testing',
      };
      const wrapper = shallow(
        <SearchScreen
          push={jest.fn()}
          location={location}
        />
      );
      expect(wrapper.find(SearchContainer).first().props().searchTerm).toEqual('testing');
    });
  });

  describe('constructTitle function', () => {
    it('should use the base title when no search query is present', () => {
      const title = SearchScreen.constructTitle({});
      expect(title).toEqual('Github User Search');
    });

    it('should return a title describing current search and page', () => {
      const title = SearchScreen.constructTitle({q: 'foo', page: 2});
      expect(title).toEqual('foo - Page 2 - Github User Search');
    });
  });

  describe('pushUrlQuery function', () => {
    it('should push a search query on the URL', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchScreen
          push={spy}
          location={{}}
        />
      );
      wrapper.instance().pushUrlQuery('testing');
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

});
