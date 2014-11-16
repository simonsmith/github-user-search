var React =       require('react');
var req =         require('reqwest');
var SearchForm =  require('./search-form.jsx');
var ResultsList = require('./results-list.jsx');
var Navigation =  require('react-router').Navigation;

module.exports = React.createClass({
  mixins: [Navigation],
  getInitialState: function () {
    return { results: { items: [] }}
  },
  handleSearchFormSubmit: function(event) {
    event.preventDefault();
    this.transitionTo('search', { username: this.refs.searchForm.getSearchTerm() })
  },
  getUsers: function(query) {
    this.setState({results: { items: [] }, query: query})

    if (!query) {
      return
    }

    req({
      url: 'https://api.github.com/search/users',
      data: {q: query},
      type: 'json'
    }).then(function(data) {
      this.setState({results: data, query: query})
    }.bind(this))
  },
  componentWillReceiveProps: function(nextProps) {
    this.getUsers(nextProps.params.username);
  },
  componentDidMount: function() {
    this.getUsers(this.props.params.username);
  },
  render: function() {
    return (
      <div className="Search">
        <h1 className="Search-title">Search for a user</h1>
        <SearchForm onUserSearch={this.handleSearchFormSubmit} query={this.state.query} ref="searchForm" />
        <ResultsList results={this.state.results} />
      </div>
    )
  }
});
