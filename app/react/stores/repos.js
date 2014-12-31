var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');
var pick =        require('lodash-node/modern/objects/pick');
var cache =       require('mixins/cache');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.userRepos, this.onUserRepos);
  },

  removeForks: function(item) {
    return item.fork == false;
  },

  sortByPopular: function(a, b) {
    return b.stargazers_count - a.stargazers_count;
  },

  trimData: function(repo) {
    return pick(repo,
      'id',
      'name',
      'html_url',
      'description',
      'stargazers_count',
      'language'
    )
  },

  cacheKey: function(username) {
    return 'repos:{username}'.replace('{username}', username);
  },

  getData: function(username) {
    req({
      url: 'https://api.github.com/users/{username}/repos'.replace('{username}', username),
      type: 'json'
    })
      .then(function(data) {
        data = data
          .filter(this.removeForks)
          .sort(this.sortByPopular)
          .map(this.trimData)
          .slice(0, 5);

        this.trigger({
          repos: data
        });

        cache.setItem(this.cacheKey(username), data);
      }.bind(this));
  },

  onUserRepos: function(username) {
    var cached = cache.getItem(this.cacheKey(username));

    if (cached) {
      this.trigger({
        repos: cached
      });
    } else {
      this.getData(username);
    }
  }
});