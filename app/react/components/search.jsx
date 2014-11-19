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
      }
    };
  },

  handleSearchFormSubmit: function(event) {
    event.preventDefault();

    this.transitionTo('users', {}, {
      q: this.refs.searchForm.getSearchTerm()
    });
  },

  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },

  search: function(query) {
    // Clear results before loading new set
    this.setState({
      results: {
        items: []
      },
      query: ''
    });

    if (!query || !this.isEmpty(query)) {
      UserActions.searchUser(query);
    }
  },

  onResults: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function(nextProps) {
    // Search if route param changes
    this.search(nextProps.query);
  },

  componentDidMount: function() {
    this.listenTo(SearchUserStore, this.onResults);

    // Search if URL params are present on page render
    this.search(this.props.query);
  },

  render: function() {
    return (
      <div className="Search">
        <h1 className="Search-title">Search for a GitHub user</h1>
        <SearchForm onUserSearch={this.handleSearchFormSubmit} query={this.state.query} ref="searchForm" />
        <ResultsList results={this.state.results} query={this.state.query} />
      </div>
    )
  }
});
