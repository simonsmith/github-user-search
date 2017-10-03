import React from 'react';
import {shallow} from 'enzyme';

import ProfileScreen from 'screens/Profile';
import DocumentTitle from 'react-document-title';
import ProfileContainer from 'containers/Profile';

describe('Screen: ProfileScreen', () => {
  it('should create a document title', () => {
    const props = {
      match: {
        params: {username: 'simonsmith'},
      },
    };
    const wrapper = shallow(<ProfileScreen {...props} />);
    expect(
      wrapper.find(DocumentTitle).props().title
    ).toEqual('simonsmith\'s profile - Github user search');
  });

  it('should pass match props to ProfileContainer', () => {
    const props = {
      match: {
        params: {username: 'simonsmith'},
      },
    };
    const wrapper = shallow(<ProfileScreen {...props} />);
    expect(wrapper.find(ProfileContainer).props()).toEqual(props);
  });
});
