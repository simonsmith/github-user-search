import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';

import SearchForm from 'components/SearchForm';

describe('Component: SearchForm', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render as expected', () => {
    const component = renderer.create(<SearchForm onSubmit={jest.fn()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when an initialInputValue prop is absent', () => {
    it('should set inputValue to an empty string', () => {
      const wrapper = shallow(<SearchForm onSubmit={jest.fn()} />);
      expect(wrapper.state('inputValue')).toEqual('');
    });
  });

  describe('when a different initialInputValue is set', () => {
    it('should update the state', () => {
      const wrapper = shallow(
        <SearchForm
          initialInputValue={'hello'}
          onSubmit={jest.fn()}
        />
      );
      expect(wrapper.state('inputValue')).toEqual('hello');
      wrapper.setProps({
        initialInputValue: 'foo',
      });
      expect(wrapper.state('inputValue')).toEqual('foo');
    });
  });

  describe('when the form is submitted', () => {
    describe('and the state has an input value', () => {
      it('should pass the value to the onSubmit function', () => {
        const spy = jest.fn();
        const wrapper = shallow(
          <SearchForm
            onSubmit={spy}
          />
        );
        wrapper.setState({inputValue: 'test'});
        wrapper.simulate('submit', {preventDefault: f => f});
        expect(spy.mock.calls[0]).toMatchSnapshot();
      });
    });

    describe('and the state has no inputValue', () => {
      it('should not call the onSubmit function', () => {
        const spy = jest.fn();
        const wrapper = shallow(
          <SearchForm
            onSubmit={spy}
          />
        );
        wrapper.simulate('submit', {preventDefault: f => f});
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

});
