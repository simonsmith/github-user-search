import React from 'react';
import joinClasses from 'utils/joinClasses';
import pluralize from 'pluralize';

var Stat = React.createClass({
  render: function() {
    return (
      <div className={joinClasses('Stat', this.props.className)}>
        <span className="Stat-value">{this.props.value}</span>
        <span className="Stat-title">{pluralize(this.props.title, this.props.value)}</span>
      </div>
    )
  }
});

export default Stat;
