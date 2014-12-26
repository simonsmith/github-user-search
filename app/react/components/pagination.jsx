var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;

var Pagination = React.createClass({
  mixins: [State],

  renderNextLink: function() {
    var query = this.getQuery();

    if (query.page >= 1) {
      query.page = ++query.page;
    } else {
      query.page = 2;
    }

    return (
      <Link className="Pagination-next" to="users" query={query}>Next</Link>
    )
  },

  renderPrevLink: function() {
    var query = this.getQuery();
    query.page = --query.page;

    if (query.page > 0) {
      return <Link className="Pagination-prev" to="users" query={query}>Previous</Link>
    }
  },

  render: function() {
    var component = (
      <div className="Pagination">
        {this.renderPrevLink()}
        {this.renderNextLink()}
      </div>
    );

    return (
      this.props.results.total_count > this.props.perpage ? component : null
    )
  }
});

module.exports = Pagination;
