import React from 'react';
import {shallow} from 'enzyme';
import {StyleSheetTestUtils} from 'aphrodite';

import {HeaderContainer} from 'containers/Header';

describe('Component: HeaderContainer', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when the searchQuery prop is not present', () => {
    it('should not call the search action', () => {
      const spy = jest.fn();
      shallow(
        <HeaderContainer
          searchQuery={''}
          searchForUser={spy}
          onSubmit={jest.fn()}
        />
      );
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when the searchQuery prop is present', () => {
    it('should call the search action', () => {
      const spy = jest.fn();
      shallow(
        <HeaderContainer
          searchQuery={'?q=test'}
          searchForUser={spy}
          onSubmit={jest.fn()}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('when the searchQuery prop changes', () => {
    it('should call the search action with the new value', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <HeaderContainer
          searchQuery={'?q=test'}
          searchForUser={spy}
          onSubmit={jest.fn()}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
      wrapper.setProps({searchQuery: '?q=foobar'});
      expect(spy.mock.calls[1]).toMatchSnapshot();
    });
  });

});
