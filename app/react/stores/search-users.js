var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.searchUser, this.onSearchUsers);
  },

  fetchFromCache: function(username) {
    var cached = sessionStorage.getItem(username);

    if (cached) {
      this.trigger({
        results: JSON.parse(cached),
        query: username
      });
    }

    return !!cached;
  },

  fetchFromServer: function(username) {
    req({
      url: 'https://api.github.com/search/users',
      data: { q: username },
      type: 'json'
    }).then(function(data) {
      this.trigger({
        results: data,
        query: username
      });
      
      sessionStorage.setItem(username, JSON.stringify(data));
    }.bind(this));
  },

  onSearchUsers: function(username) {
    if (!this.fetchFromCache.call(this, username)) {
      this.fetchFromServer.call(this, username);
    }
  }
});
