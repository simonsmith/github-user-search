var React = require('react');

var Stat = React.createClass({
  render: function() {
    return (
      <div className="Stat">
        <span className="Stat-value">{this.props.value}</span>
        <span className="Stat-title">{this.props.title}</span>
      </div>
    )
  }
});

module.exports = Stat;
