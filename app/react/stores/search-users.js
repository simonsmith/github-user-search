var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.searchUser, this.onSearchUsers);
  },

  cacheKey: function(query) {
    return JSON.stringify(query)
  },

  fetchFromCache: function(query) {
    var cached = sessionStorage.getItem(this.cacheKey(query));

    if (cached) {
      this.trigger({
        results: JSON.parse(cached),
        query: query
      });
    }

    return !!cached;
  },

  fetchFromServer: function(query) {
    req({
      url: 'https://api.github.com/search/users',
      data: query,
      type: 'json'
    }).then(function(data) {
      this.trigger({
        results: data,
        query: query
      });

      sessionStorage.setItem(this.cacheKey(query), JSON.stringify(data));
    }.bind(this));
  },

  onSearchUsers: function(query) {
    if (!this.fetchFromCache.call(this, query)) {
      this.fetchFromServer.call(this, query);
    }
  }
});
