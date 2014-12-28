var React =       require('react');
var ProfileStat = require('./profile-stat.jsx');
var map =         require('lodash-node/modern/collections/map');
var uniqueId =    require('lodash-node/modern/utilities/uniqueId');

var ProfileStatGroup = React.createClass({
  renderStatItems: function() {
    return map(this.props.stats, function(value, key) {
      return (
        <li key={uniqueId()} className="ProfileStatGroup-item">
          <ProfileStat value={value} title={key} />
        </li>
      );
    });
  },

  render: function() {
    return (
      <ul className="ProfileStatGroup">
        {this.renderStatItems()}
      </ul>
    )
  }
});

module.exports = ProfileStatGroup;
