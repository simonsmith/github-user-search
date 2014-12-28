var React = require('react');

var Profile = React.createClass({
  render: function() {
    return (
      <div className="Profile">
        <h2>{this.props.user.name}</h2>
        {this.props.user}
      </div>
    )
  }
});

module.exports = Profile;
