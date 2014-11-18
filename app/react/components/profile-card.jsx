var React =  require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div className="ProfileCard Media">
        <Link className="ProfileCard-link" to="user" params={{ username: this.props.username }}>
          <div className="Media-object">
            <img className="ProfileCard-avatar" src={this.props.avatar} width="40" />
          </div>
          <div className="Media-body">
            <h2 className="ProfileCard-username Media-heading">{this.props.username}</h2>
          </div>
        </Link>
      </div>
    )
  }
});
