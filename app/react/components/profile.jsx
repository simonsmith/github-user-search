var React = require('react');

var Profile = React.createClass({
  render: function() {
    return (
      <div className="Profile">
        <h1>{this.props.user.name}</h1>
      </div>
    )
  }
});

module.exports = Profile;
