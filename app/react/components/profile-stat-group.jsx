import React from 'react';
import Stat from './stat.jsx';
import map from 'lodash-node/modern/collection/map';
import uniqueId from 'lodash-node/modern/utility/uniqueId';

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

export default ProfileStatGroup;
