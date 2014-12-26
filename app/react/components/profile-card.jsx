var React =  require('react');
var Link = require('react-router').Link;

var ProfileCard = React.createClass({
  render: function() {
    return (
      <div className="ProfileCard">
        <Link className="ProfileCard-link u-cf u-linkClean" to="user" params={{ username: this.props.username }}>
          <img className="ProfileCard-avatar" src={this.props.avatar} width="40" height="40" />
          <h2 className="ProfileCard-username u-textTruncate">{this.props.username}</h2>
        </Link>
      </div>
    )
  }
});

module.exports = ProfileCard;
