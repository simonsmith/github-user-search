import React from 'react';
import Router, { State, Link } from 'react-router'

var Pagination = React.createClass({
  mixins: [State],

  renderNextLink() {
    var query = this.getQuery();
    query.page = query.page >= 1 ? ++query.page : 2;

    return (
      <Link className="Pagination-next u-block u-floatRight" to="users" query={query}>
        Next <span aria-hidden="true">&raquo;</span>
      </Link>
    )
  },

  renderPrevLink() {
    var query = this.getQuery();
    query.page = --query.page;

    if (query.page > 0) {
      return (
        <Link className="Pagination-prev u-block u-floatLeft" to="users" query={query}>
          <span aria-hidden="true">&laquo;</span> Previous
        </Link>
      )
    }
  },

  render() {
    var component = (
      <div className="Pagination u-cf">
        {this.renderPrevLink()}
        {this.renderNextLink()}
      </div>
    );

    return this.props.results.total_count > this.props.perpage ? component : null
  }
});

export default Pagination;
