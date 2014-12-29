var React =       require('react');
var Router =      require('react-router');
var Navigation =  Router.Navigation;
var State =       Router.State;
var Reflux =      require('reflux');
var isEmpty =     require('lodash-node/modern/objects/isEmpty');

var SearchForm =      require('./search-form.jsx');
var Pagination =      require('./pagination.jsx');
var Results =         require('./results.jsx');
var ResultsMessage =  require('./results-message.jsx');
var UserActions =     require('actions/user');
var SearchUserStore = require('stores/search-users');

var Search = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin, State],

  getInitialState: function() {
    return {
      results: {
        items: []
      }
    };
  },

  handleSearchFormSubmit: function(event) {
    event.preventDefault();

    this.transitionTo('users', {}, {
      q: this.refs.searchForm.getSearchTerm(),
      page: 1
    });
  },

  search: function(query) {
    // Clear results before loading new set
    this.setState({
      results: {
        items: []
      },
      query: query
    });

    if (!isEmpty(query)) {
      UserActions.searchUser(query);
    }
  },

  onResults: function(data) {
    this.setState(data);
  },

  componentWillReceiveProps: function() {
    // Search if route param changes
    this.search(this.getQuery());
  },

  componentDidMount: function() {
    this.listenTo(SearchUserStore, this.onResults);

    // Search if URL params are present on page render
    this.search(this.getQuery());
  },

  render: function() {
    return (
      <div className="Search">
        <div className="Search-item Search-wrapSearchForm">
          <div className="Container">
            <SearchForm onUserSearch={this.handleSearchFormSubmit} query={this.state.query} ref="searchForm" />
            <ResultsMessage results={this.state.results} query={this.state.query} />
          </div>
        </div>
        <div className="Container">
          <div className="Search-item">
            <Results results={this.state.results} />
          </div>
          <div className="Search-item u-mXA u-size8of10 u-md-size5of10">
            <Pagination results={this.state.results} perpage="30" />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Search;
