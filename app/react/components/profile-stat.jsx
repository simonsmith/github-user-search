var React = require('react');

var ProfileStat = React.createClass({
  render: function() {
    return (
      <div className="ProfileStat">
        <span className="ProfileStat-value">{this.props.value}</span>
        <span className="ProfileStat-title">{this.props.title}</span>
      </div>
    )
  }
});

module.exports = ProfileStat;
