var req =         require('reqwest');
var Reflux =      require('reflux');
var UserActions = require('../actions/user');
var pick =        require('lodash-node/modern/objects/pick');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(UserActions.userProfile, this.onUserProfile);
  },

  onUserProfile: function(username) {
    req({
      url: 'https://api.github.com/users/' + username,
      type: 'json'
    })
      .then(function(data) {
        this.trigger({
          user: pick(data,
            'avatar_url',
            'bio',
            'blog',
            'followers',
            'following',
            'id',
            'location',
            'login',
            'name',
            'company',
            'html_url'
          )
        });
      }.bind(this));
  }
});