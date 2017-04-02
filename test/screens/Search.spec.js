import React from 'react';
import {shallow} from 'enzyme';
import SearchScreen from 'screens/Search';
import DocumentTitle from 'react-document-title';
import SearchResultsContainer from 'containers/SearchResults';

describe('Screen: SearchScreen', () => {
  it('should create a document title', () => {
    const props = {
      location: {
        search: '?per_page=42&page=1&q=simon',
      },
    };
    const wrapper = shallow(<SearchScreen {...props} />);
    expect(
      wrapper.find(DocumentTitle).props().title
    ).toEqual('simon - Page 1 - Github user search');
  });

  it('should pass match props and searchTerm to SearchResultsContainer', () => {
    const props = {
      location: {
        search: '?per_page=42&page=1&q=simon',
      },
    };
    const wrapper = shallow(<SearchScreen {...props} />);
    expect(wrapper.find(SearchResultsContainer).props()).toMatchSnapshot();
  });
});
