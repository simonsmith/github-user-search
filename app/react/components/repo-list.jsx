import React from 'react';
import Repo from  './repo.jsx';
import map from 'lodash-node/modern/collection/map';

var RepoList = React.createClass({
  render: function() {
    var repos = map(this.props.repos, function(repo) {
      return (
        <li className="RepoList-item" key={repo.id}>
          <Repo data={repo} />
        </li>
      );
    });

    return (
      <ul className="RepoList">
        {repos}
      </ul>
    )
  }
});

export default RepoList;
