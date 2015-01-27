import React from 'react';
import Router, { State, Link } from 'react-router'

var Pagination = React.createClass({
  mixins: [State],

  renderNextLink() {
    if (this.props.pagination.next) {
      let url = new URL(this.props.pagination.next);
      return (
        <Link className="Pagination-link Pagination-link--next" to={`${url.pathname}${url.search}`}>
          Next <span aria-hidden="true">&raquo;</span>
        </Link>
      )
    }
  },

  renderPrevLink() {
    if (this.props.pagination.prev) {
      let url = new URL(this.props.pagination.prev);
      return (
        <Link className="Pagination-link Pagination-link--prev" to={`${url.pathname}${url.search}`}>
          <span aria-hidden="true">&laquo;</span> Previous
        </Link>
      )
    }
  },

  renderFirstLink() {
    if (this.props.pagination.first) {
      let url = new URL(this.props.pagination.first);
      return (
        <Link className="Pagination-link Pagination-link--first" to={`${url.pathname}${url.search}`}>
          <span aria-hidden="true">&laquo;&laquo;</span> First
        </Link>
      )
    }
  },

  renderLastLink() {
    if (this.props.pagination.last) {
      let url = new URL(this.props.pagination.last);
      return (
        <Link className="Pagination-link Pagination-link--last" to={`${url.pathname}${url.search}`}>
          Last <span aria-hidden="true">&raquo;&raquo;</span>
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
