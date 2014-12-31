var React =       require('react');
var Stat =        require('./stat.jsx');
var map =         require('lodash-node/modern/collections/map');
var uniqueId =    require('lodash-node/modern/utilities/uniqueId');

var ProfileStatGroup = React.createClass({
  renderStatItems: function() {
    return map(this.props.stats, function(value, key) {
      return (
        <li key={uniqueId()} className="ProfileStatGroup-item">
          <Stat value={value} title={key} className="Stat--large" />
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
