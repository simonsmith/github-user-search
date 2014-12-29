var React = require('react');
var Repo =  require('./repo.jsx');
var map =   require('lodash-node/modern/collections/map');

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

module.exports = RepoList;
