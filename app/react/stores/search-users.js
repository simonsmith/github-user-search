var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.searchUser, this.onSearchUsers);
  },

  fetchFromCache: function(query) {
    var cached = sessionStorage.getItem(JSON.stringify(query));

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
    })
      .then(function(data) {
        this.trigger({
          results: data,
          query: query
        });
        sessionStorage.setItem(JSON.stringify(query), JSON.stringify(data));
      }.bind(this))
      .fail(function(xhr) {
        this.trigger({
          results: {
            items: [],
            error: JSON.parse(xhr.responseText)
          },
          query: query
        })
      }.bind(this))
  },

  onSearchUsers: function(query) {
    if (!this.fetchFromCache.call(this, query)) {
      this.fetchFromServer.call(this, query);
    }
  }
});
