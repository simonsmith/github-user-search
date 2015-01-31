import React from 'react';
import Router, { Navigation, State } from 'react-router'
import Reflux from 'reflux';

import isEmpty from 'lodash-node/modern/lang/isEmpty';
import isString from 'lodash-node/modern/lang/isString';

import SearchForm from './search-form.jsx';
import Pagination from './pagination.jsx';
import Results from './results.jsx';
import ResultsMessage from './results-message.jsx';

import User from 'actions/user';
import SearchStore from 'stores/search';

var Search = React.createClass({
  mixins: [
    Navigation,
    Reflux.connect(SearchStore),
    Reflux.ListenerMixin,
    State
  ],

  handleSearchFormSubmit(event) {
    event.preventDefault();

    this.transitionTo('users', {}, {
      q: this.refs.searchForm.getSearchTerm()
    });
  },

  search(url) {
    // Clear results before loading new set
    this.setState(SearchStore.getInitialState());

    if (isString(url) && !isEmpty(this.getQuery())) {
      User.search(url);
    }
  },

  componentWillReceiveProps() {
    // Search if route param changes
    this.search(this.getPath());
  },

  componentDidMount() {
    // Search if URL params are present on page render
    this.search(this.getPath());
  },

  render() {
    return (
      <div className="Search">
        <div className="Search-item Search-wrapSearchForm">
          <div className="Container">
            <SearchForm onUserSearch={this.handleSearchFormSubmit} query={this.state.query} ref="searchForm" />
            <ResultsMessage results={this.state.results} query={this.getQuery().q} />
          </div>
        </div>
        <div className="Container">
          <div className="Search-item">
            <Results results={this.state.results} />
          </div>
          <div className="Search-item u-mXA u-size8of10 u-md-size5of10">
            <Pagination pagination={this.state.pagination} />
          </div>
        </div>
      </div>
    )
  }
});

export default Search;
