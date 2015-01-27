import React from 'react';
import ProfileCard from './profile-card.jsx';
import map from 'lodash-node/modern/collection/map';

var Results = React.createClass({
  renderResultsItem: function(user) {
    return (
      <li key={user.id} className="Results-item">
        <ProfileCard username={user.login} avatar={user.avatar_url} />
      </li>
    )
  },

  render: function() {
    var resultsItems = this.props.results && map(this.props.results.items, this.renderResultsItem);

    return (
      <div className="Results">
        <ul className="Results-list u-cf">
          {resultsItems}
        </ul>
      </div>
    )
  }
});

export default Results;
