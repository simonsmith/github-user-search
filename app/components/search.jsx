var React =       require('react');
var Navigation =  require('react-router').Navigation;
var Reflux =      require('reflux');

var SearchForm =      require('./search-form.jsx');
var ResultsList =     require('./results.jsx');
var UserActions =     require('../actions/user');
var SearchUserStore = require('../stores/search-users');

module.exports = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      results: {
        items: []
      },
      query: ''
    };
  },

  handleSearchFormSubmit: function(event) {
    event.preventDefault();

    this.transitionTo('users', {
      username: this.refs.searchForm.getSearchTerm()
    });
  },

  search: function(username) {
    // Clear results before loading new set
    this.setState({
      results: {
        items: []
      },
      query: username
    });

    if (username) {
      UserActions.searchUsername(username);
    }
  },

  onResults: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function(nextProps) {
    // Search if route param changes
    this.search(nextProps.params.username);
  },

  componentDidMount: function() {
    this.listenTo(SearchUserStore, this.onResults);

    // Search if URL params are present on page render
    this.search(this.props.params.username);
  },

  render: function() {
    return (
      <div className="Search">
        <h1 className="Search-title">Search for a user</h1>
        <SearchForm onUserSearch={this.handleSearchFormSubmit} query={this.state.query} ref="searchForm" />
        <ResultsList results={this.state.results} />
        <this.props.activeRouteHandler />
      </div>
    )
  }
});
