import React from 'react';
import Router, { State, Link } from 'react-router'

var Pagination = React.createClass({
  mixins: [State],

  renderNextLink() {
    if (this.props.pagination.next) {
      let url = new URL(this.props.pagination.next);
      return (
        <Link className="Pagination-link Pagination-link--next u-linkClean" to={`${url.pathname}${url.search}`}>
          Next <span aria-hidden="true">&rsaquo;</span>
        </Link>
      )
    }
  },

  renderPrevLink() {
    if (this.props.pagination.prev) {
      let url = new URL(this.props.pagination.prev);
      return (
        <Link className="Pagination-link Pagination-link--prev u-linkClean" to={`${url.pathname}${url.search}`}>
          <span aria-hidden="true">&lsaquo;</span> Previous
        </Link>
      )
    }
  },

  renderFirstLink() {
    if (this.props.pagination.first) {
      let url = new URL(this.props.pagination.first);
      return (
        <Link className="Pagination-link Pagination-link--first u-linkClean" to={`${url.pathname}${url.search}`}>
          <span aria-hidden="true">&laquo;</span> First
        </Link>
      )
    }
  },

  renderLastLink() {
    if (this.props.pagination.last) {
      let url = new URL(this.props.pagination.last);
      return (
        <Link className="Pagination-link Pagination-link--last u-linkClean" to={`${url.pathname}${url.search}`}>
          Last <span aria-hidden="true">&raquo;</span>
        </Link>
      )
    }
  },

  render() {
    return (
      <div className="Pagination u-cf">
        {this.renderFirstLink()}
        {this.renderPrevLink()}
        {this.renderNextLink()}
        {this.renderLastLink()}
      </div>
    );
  }
});

export default Pagination;
