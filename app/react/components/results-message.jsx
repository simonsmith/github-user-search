import React from 'react';
import pluralize from 'pluralize';

var ResultsMessage = React.createClass({
  render: function() {
    var results = this.props.results;
    var total = results.total_count;
    var resultsMessage;

    // Found some results
    if (total > 0) {
      resultsMessage = (
        <span>
          <b>{total}</b> {pluralize('results', total)} for <mark>{this.props.query}</mark>
        </span>
      );
    }

    // Found zero results
    if (total == 0) {
      resultsMessage = (
        <span>No results for <mark>{this.props.query}</mark></span>
      );
    }

    // Found results, but no more pages
    if (total > 0 && !results.items.length) {
      resultsMessage = (
        <span>No more results for <mark>{this.props.query}</mark></span>
      );
    }

    // No results because error
    if (results.error) {
      resultsMessage = (
        <span><b>Error:</b> {results.error.message}</span>
      )
    }

    return (
      <p className="ResultsMessage">
        {resultsMessage}
      </p>
    )
  }
});

export default ResultsMessage;