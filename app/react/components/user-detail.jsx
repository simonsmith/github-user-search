var React =       require('react');
var Router =      require('react-router');
var Navigation =  Router.Navigation;
var State =       Router.State;
var Reflux =      require('reflux');

var UserActions =  require('../actions/user');
var ProfileStore = require('../stores/profile');

var Profile =      require('./profile.jsx');

var UserDetail = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin, State],

  getInitialState: function() {
    return {
      user: {}
    };
  },

  getProfile: function(user) {
    UserActions.userProfile(user);
  },

  onProfileData: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function() {
    this.getProfile(this.getParams().username);
  },

  componentDidMount: function() {
    this.listenTo(ProfileStore, this.onProfileData);
    this.getProfile(this.getParams().username);
  },

  render: function() {
    return (
      <div className="UserDetail">
        <Profile user={this.state.user} />
      </div>
    )
  }
});

module.exports = UserDetail;
