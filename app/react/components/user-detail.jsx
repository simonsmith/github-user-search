var React =        require('react');
var Router =       require('react-router');
var Navigation =   Router.Navigation;
var State =        Router.State;
var Reflux =       require('reflux');

var UserActions =  require('actions/user');
var ProfileStore = require('stores/profile');
var RepoStore =    require('stores/repos');

var Profile =      require('./profile.jsx');
var Repos =        require('./repos.jsx');

var UserDetail = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin, State],

  getInitialState: function() {
    return {
      user: {},
      repos: []
    };
  },

  getUserData: function(user) {
    UserActions.userProfile(user);
    UserActions.userRepos(user);
  },

  onReceiveData: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function() {
    this.getUserData(this.getParams().username);
  },

  componentDidMount: function() {
    this.listenTo(ProfileStore, this.onReceiveData);
    this.listenTo(RepoStore, this.onReceiveData);

    this.getUserData(this.getParams().username);
  },

  render: function() {
    return (
      <div className="UserDetail">
        <h1 className="u-hiddenVisually">Github user detail</h1>
        <div className="UserDetail-item UserDetail-header">
          <div className="Container">
            <Profile user={this.state.user} />
          </div>
        </div>
        <div className="UserDetail-item Container">
          <Repos repos={this.state.repos} />
        </div>
      </div>
    )
  }
});

module.exports = UserDetail;
