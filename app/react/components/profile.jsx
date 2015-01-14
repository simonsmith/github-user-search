import React from 'react';
import ProfileStatGroup from './profile-stat-group.jsx';

var Profile = React.createClass({
  render: function() {
    var stats = {
      'Followers': this.props.user.followers,
      'Following': this.props.user.following,
      'Repos': this.props.user.public_repos
    };

    return (
      <div className="Profile u-cf">
        <div className="Profile-avatar">
          <img className="Profile-avatarImg u-imgResponsive" src={this.props.user.avatar_url} width="190" height="190" />
        </div>
        <div className="Profile-body">
          <h2 className="Profile-name">
            <a className="Profile-link u-linkClean" href={this.props.user.html_url}>
              {this.props.user.name}
            </a>
          </h2>
          <div className="Profile-userInfo">
            <p className="Profile-userItem">{this.props.user.login}</p>
            <p className="Profile-userItem">{this.props.user.location}</p>
            <p className="Profile-userItem"><a href={this.props.user.blog} target="_blank">{this.props.user.blog}</a></p>
          </div>
          <div className="Profile-wrapProfileStatGroup">
            <ProfileStatGroup stats={stats} />
          </div>
        </div>
      </div>
    )
  }
});

export default Profile;
