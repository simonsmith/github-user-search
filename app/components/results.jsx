var React =  require('react');
var ProfileCard = require('./profile-card.jsx');

module.exports = React.createClass({
  render: function() {
    var results = this.props.results.items.map(function(user) {
      return (
        <li key={user.id} className="Results-item">
          <ProfileCard username={user.login} avatar={user.avatar_url} />
        </li>
      )
    });

    return (
      <ul className="Results">
        {results}
      </ul>
    )
  }
});
