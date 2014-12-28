var React = require('react');

var Profile = React.createClass({
  render: function() {
    return (
      <div className="Profile u-cf">
        <div className="Profile-avatar">
          <img className="Profile-avatarImg u-imgResponsive" src={this.props.user.avatar_url} width="190" height="190" />
        </div>
        <div className="Profile-body">
          <h2 className="Profile-name">{this.props.user.name}</h2>
          <div className="Profile-userInfo">
            <p className="Profile-userItem">{this.props.user.login}</p>
            <p className="Profile-userItem">{this.props.user.location}</p>
            <p className="Profile-userItem"><a href={this.props.user.blog} target="_blank">{this.props.user.blog}</a></p>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
