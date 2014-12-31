var React = require('react');
var Stat =  require('components/stat.jsx');

var Repo = React.createClass({
  render: function() {
    return (
      <div className="Repo">
        <a className="Repo-link u-linkBlock" href={this.props.data.html_url}>
          <h3 className="Repo-name">{this.props.data.name}</h3>
          <p className="Repo-description">{this.props.data.description}</p>
          <Stat value={this.props.data.stargazers_count} title="Stars" />
        </a>
      </div>
    )
  }
});

module.exports = Repo;