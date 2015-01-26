import React from 'react';
import Router, { Navigation, State } from 'react-router'
import Reflux from 'reflux';
import isEmpty from 'lodash-node/modern/objects/isEmpty';

import SearchForm from './search-form.jsx';
import Pagination from './pagination.jsx';
import Results from './results.jsx';
import ResultsMessage from './results-message.jsx';

import User from 'actions/user';
import SearchStore from 'stores/search';

var Search = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin, State],

  getInitialState() {
    return {
      results: {
        items: []
      }
    };
  },

  handleSearchFormSubmit(event) {
    event.preventDefault();

    this.transitionTo('users', {}, {
      q: this.refs.searchForm.getSearchTerm()
    });
  },

  search(query) {
    // Clear results before loading new set
    this.setState({
      results: {
        items: []
      },
      query
    });

    if (!isEmpty(query)) {
      User.search(query);
    }
  },

  onResults(data) {
    this.setState(data);
  },

  componentWillReceiveProps() {
    // Search if route param changes
    this.search(this.getQuery());
  },

  componentDidMount() {
    this.listenTo(SearchStore, this.onResults);

    // Search if URL params are present on page render
    this.search(this.getQuery());
  },

  render() {
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

export default Search;
