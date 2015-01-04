var React =        require('react');
var Router =       require('react-router');
var Navigation =   Router.Navigation;
var State =        Router.State;
var Reflux =       require('reflux');

var UserActions =  require('actions/user');
var ProfileStore = require('stores/profile');
var RepoStore =    require('stores/repos');

var Profile =      require('./profile.jsx');
var RepoList =     require('./repo-list.jsx');

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
        <header className="UserDetail-item UserDetail-header">
          <h1 className="u-hiddenVisually">Github user detail</h1>
          <div className="Container">
            <Profile user={this.state.user} />
          </div>
        </header>
        <div className="UserDetail-item Container">
          <div className="Grid">
            <div className="Grid-cell u-sm-size1of2">
              <h2 className="UserDetail-itemHeader">Popular Repositories</h2>
              <RepoList repos={this.state.repos} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = UserDetail;
