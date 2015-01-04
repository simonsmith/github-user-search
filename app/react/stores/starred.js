var req =          require('reqwest');
var Reflux =       require('reflux');
var ProfileStore = require('stores/profile');
var pick =         require('lodash-node/modern/objects/pick');
var cache =        require('mixins/cache');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(ProfileStore, this.onUserProfile);
  },

  cacheKey: function(username) {
    return 'starred:{username}'.replace('{username}', username);
  },

  getStarredData: function(url, username) {
    req({
      url: url.replace(/\{\/[a-z]+}/g, ''),
      type: 'json'
    })
      .then(function(data) {
        data = data.map(function(repo) {
          return pick(repo,
            'id',
            'name',
            'html_url',
            'description'
          )
        });

        this.trigger({
          starred: data
        });

        cache.setItem(this.cacheKey(username), data);
      }.bind(this));
  },

  onUserProfile: function(data) {
    var cached = cache.getItem(this.cacheKey(data.user.login));

    if (cached) {
      this.trigger({
        starred: cached
      });
    } else {
      this.getStarredData(data.user.starred_url, data.user.login);
    }
  }
});