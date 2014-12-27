var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');
var pick =        require('lodash-node/modern/objects/pick');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.userRepos, this.onUserRepos);
  },

  onUserRepos: function(username) {
    req({
      url: 'https://api.github.com/users/{username}/repos'.replace('{username}', username),
      type: 'json'
    })
      .then(function(data) {
        this.trigger({
          repos: data
        });
      }.bind(this));
  }
});