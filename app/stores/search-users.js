var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.searchUsername, this.onSearchUsers);
  },

  onSearchUsers: function(username) {
    req({
      url: 'https://api.github.com/search/users',
      data: { q: username },
      type: 'json'
    }).then(function(data) {
      this.trigger({
        results: data,
        query: username
      });
    }.bind(this));
  }
});
