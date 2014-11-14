/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var req = require('reqwest');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Navigation = Router.Navigation


var App = React.createClass({
  render: function() {
    return (
      <div className="Container">
        <div className="Content">
          <this.props.activeRouteHandler/>
        </div>
      </div>
    )
  }
});

var Search = React.createClass({
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

var ResultsList = React.createClass({
  render: function() {
    var results = this.props.results.items.map(function(user) {
      return (
        <li key={user.id} className="ResultsList-item">
          <Result username={user.login} />
        </li>
      )
    })

    return (
      <ul className="ResultsList">
        {results}
      </ul>
    )
  }
});

var Result = React.createClass({
  render: function() {
    return (
      <div className="Result">
        <h2 className="Result-username">{this.props.username}</h2>
      </div>
    )
  }
});

var SearchForm = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({value: nextProps.query});
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  getSearchTerm: function () {
    return this.refs.input.getDOMNode().value
  },
  render: function() {
    return (
      <form className="SearchForm" onSubmit={this.props.onUserSearch}>
        <input className="SearchForm-input" placeholder="e.g simonsmith" type="text" ref="input" value={this.state.value} onChange={this.handleChange} />
        <button className="SearchForm-btn Button" type="submit">Go</button>
      </form>
    )
  }
});

var routes = (
  <Routes>
    <Route name="app" path="/" handler={App}>
      <Route name="search" path="/:username" handler={Search} />
      <DefaultRoute handler={Search}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);
