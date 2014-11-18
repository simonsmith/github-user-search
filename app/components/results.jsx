var React =  require('react');
var ProfileCard = require('./profile-card.jsx');

module.exports = React.createClass({
  render: function() {
    var results = this.props.results;
    var items = results.items.map(function(user) {
      return (
        <li key={user.id} className="Results-item">
          <ProfileCard username={user.login} avatar={user.avatar_url} />
        </li>
      )
    });

    var total = results.total_count;
    if (total) {
      var totalMessage = <p className="Results">
                    <b>{total}</b> result{total == 1 ? '' : 's'} for <mark>{this.props.query}</mark>
                  </p>
    }

    return (
      <div className="Results">
        {totalMessage}
        <ul className="Results-list">
          {items}
        </ul>
      </div>
    )
  }
});
