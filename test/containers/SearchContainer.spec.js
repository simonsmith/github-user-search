import React from 'react';
import {shallow} from 'enzyme';

import {SearchContainer} from '../../src/containers/SearchContainer';

describe('Component: SearchContainer', () => {

  describe('when a query prop is not present', () => {
    it('should not call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          query={''}
          searchUser={spy}
          pushRoute={jest.fn()}
        />
      );
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when a query prop is present', () => {
    it('should call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          query={'testing'}
          searchUser={spy}
          pushRoute={jest.fn()}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('when a query prop changes', () => {
    it('should call the search action with the new value', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchContainer
          query={'testing'}
          searchUser={spy}
          pushRoute={jest.fn()}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
      wrapper.setProps({query: 'foobar'});
      expect(spy.mock.calls[1]).toMatchSnapshot();
    });
  });

});
