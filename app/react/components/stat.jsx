var React =       require('react');
var joinClasses = require('utils/joinClasses');

var Stat = React.createClass({
  render: function() {
    return (
      <div className={joinClasses('Stat', this.props.className)}>
        <span className="Stat-value">{this.props.value}</span>
        <span className="Stat-title">{this.props.title}</span>
      </div>
    )
  }
});

module.exports = Stat;
