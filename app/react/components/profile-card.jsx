var React =  require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div className="ProfileCard">
        <Link className="ProfileCard-link u-cf u-block" to="user" params={{ username: this.props.username }}>
          <img className="ProfileCard-avatar" src={this.props.avatar} width="40" />
          <h2 className="ProfileCard-username">{this.props.username}</h2>
        </Link>
      </div>
    )
  }
});
