var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('actions/user');
var pick =        require('lodash-node/modern/objects/pick');
var map =         require('lodash-node/modern/collections/map');
var cache =       require('mixins/cache');


module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.searchUser, this.onSearchUsers);
  },

  filterResults: function(data) {
    data = pick(data, 'items', 'total_count');
    data.items = map(data.items, function(item) {
      return pick(item, 'avatar_url', 'id', 'login');
    });
    return data;
  },

  getFromServer: function(query) {
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
        cache.setItem(JSON.stringify(query), this.filterResults(data));
      }.bind(this))
      .fail(function(xhr) {
        this.trigger({
          results: {
            items: [],
            error: JSON.parse(xhr.responseText)
          },
          query: query
        });
      }.bind(this))
  },

  onSearchUsers: function(query) {
    var cached = cache.getItem(JSON.stringify(query));

    if (cached) {
      this.trigger({
        results: cached,
        query: query
      });
    } else {
      this.getFromServer(query);
    }
  }
});
