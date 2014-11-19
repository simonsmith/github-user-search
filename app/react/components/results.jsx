var React =       require('react');
var ProfileCard = require('./profile-card.jsx');

module.exports = React.createClass({
  renderItem: function(user) {
    return (
      <li key={user.id} className="Results-item">
        <ProfileCard username={user.login} avatar={user.avatar_url} />
      </li>
    )
  },

  render: function() {
    var results = this.props.results;
    var items = results.items.map(this.renderItem);

    var total = results.total_count;
    if (total) {
      var totalMessage = (
        <p className="Results-total">
          <b>{total}</b> result{total == 1 ? '' : 's'} for <mark>{this.props.query.q}</mark>
        </p>
      );
    }

    if (this.props.query && !results.items.length) {
      var noResults = (
        <p>Nothing found for <mark>{this.props.query.q}</mark></p>
      );
    }

    return (
      <div className="Results u-cf">
        {totalMessage}
        {noResults}
        <ul className="Results-list">
          {items}
        </ul>
      </div>
    )
  }
});
