import React from 'react';
import {shallow} from 'enzyme';

import {SearchContainer} from '../../src/containers/SearchContainer';

describe('Component: SearchContainer', () => {

  describe('when the search prop is not present', () => {
    it('should not call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          search={''}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when the search prop is present', () => {
    it('should call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          search={'?q=test'}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('when the search prop changes', () => {
    it('should call the search action with the new value', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchContainer
          search={'?q=test'}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
      wrapper.setProps({search: '?q=foobar'});
      expect(spy.mock.calls[1]).toMatchSnapshot();
    });
  });

});
