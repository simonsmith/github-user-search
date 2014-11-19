var React =       require('react');
var ProfileCard = require('./profile-card.jsx');

module.exports = React.createClass({
  renderResultsItem: function(user) {
    return (
      <li key={user.id} className="Results-item">
        <ProfileCard username={user.login} avatar={user.avatar_url} />
      </li>
    )
  },

  renderResultsMessage: function() {
    var results = this.props.results;
    var total = results.total_count;
    var resultsMessage;

    // Found some results
    if (total > 0) {
      resultsMessage = (
        <span>
          <b>{total}</b> result{total == 1 ? '' : 's'} for <mark>{this.props.query.q}</mark>
        </span>
      );
    }

    // Found zero results
    if (total == 0) {
      resultsMessage = (
        <span>No results for <mark>{this.props.query.q}</mark></span>
      );
    }

    // Found results, but no more pages
    if (total > 0 && !results.items.length) {
      resultsMessage = (
        <span>No more results for <mark>{this.props.query.q}</mark></span>
      );
    }

    return (
      <p className="Results-message">
        {resultsMessage}
      </p>
    )
  },

  render: function() {
    var resultsItems = this.props.results.items.map(this.renderResultsItem);

    return (
      <div className="Results u-cf">
        {this.renderResultsMessage()}
        <ul className="Results-list">
          {resultsItems}
        </ul>
      </div>
    )
  }
});
