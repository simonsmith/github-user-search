var React =  require('react/addons');
var Router = require('react-router');
var State = Router.State;
var LinkedStateMixin = React.addons.LinkedStateMixin;

var SearchForm = React.createClass({
  mixins: [State, LinkedStateMixin],

  getInitialState: function() {
    return { value: '' };
  },

  componentWillReceiveProps: function() {
    this.setState({ value: this.getQuery().q });
  },

  getSearchTerm: function () {
    return this.refs.input.getDOMNode().value
  },

  render: function() {
    return (
      <form className="SearchForm" onSubmit={this.props.onUserSearch}>
        <div className="Container">
          <h1 className="SearchForm-title">Search for a GitHub user</h1>
          <div className="SearchForm-search">
            <input className="SearchForm-input FormControl u-inlineBlock" placeholder="e.g simonsmith" type="text" ref="input" valueLink={this.linkState('value')} />
            <button className="SearchForm-btn Button Button--default" type="submit">Go</button>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = SearchForm;
