import React from 'react';
import {shallow} from 'enzyme';
import SearchScreen from '../../src/screens/SearchScreen';
import SearchContainer from '../../src/containers/SearchContainer';

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

  describe('pushUrlQuery function', () => {
    it('should push a search query on the URL', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchScreen
          push={spy}
          location={location}
        />
      );
      wrapper.instance().pushUrlQuery('testing');
      expect(spy.mock.calls[0]).toMatchSnapshot();

    });
  });

});
