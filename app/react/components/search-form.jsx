var React =  require('react');
var Router = require('react-router');
var State = Router.State;

module.exports = React.createClass({
  mixins: [State],

  getInitialState: function() {
    return { value: '' };
  },

  componentWillReceiveProps: function() {
    this.setState({ value: this.getQuery().q });
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
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
