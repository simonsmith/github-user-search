import React from 'react';
import Router, { Navigation, State } from 'react-router'
import Reflux from 'reflux';

import User from 'actions/user';
import ProfileStore from 'stores/profile';
import RepoStore from 'stores/repos';
import StarredStore from 'stores/starred';

import Profile from './profile.jsx';
import RepoList from './repo-list.jsx';

var UserDetail = React.createClass({
  mixins: [
    Navigation,
    Reflux.connect(ProfileStore),
    Reflux.connect(RepoStore),
    Reflux.connect(StarredStore),
    Reflux.ListenerMixin,
    State
  ],

  componentWillReceiveProps: function() {
    User.profile(this.getPath(), this.getParams().username);
  },

  componentDidMount: function() {
    User.profile(this.getPath(), this.getParams().username);
  },

  render: function() {
    return (
      <div className="UserDetail">
        <header className="UserDetail-item UserDetail-header">
          <h1 className="u-hiddenVisually">Github user detail</h1>
          <div className="Container">
            <Profile user={this.state.user} />
          </div>
        </header>
        <div className="UserDetail-item Container">
          <div className="Grid Grid--withGutter">
            <div className="Grid-cell u-sm-size1of2">
              <h2 className="UserDetail-itemHeader">Popular Repositories</h2>
              <RepoList repos={this.state.repos} />
            </div>
            <div className="Grid-cell u-sm-size1of2">
              <h2 className="UserDetail-itemHeader">Recently Starred</h2>
              <RepoList repos={this.state.starred} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default UserDetail;
