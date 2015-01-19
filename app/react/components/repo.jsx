import React from 'react';
import Stat from './stat.jsx';

var Repo = React.createClass({
  renderStat: function() {
    if (this.props.data.stargazers_count) {
      return (
        <div className="Repo-wrapStat">
          <Stat value={this.props.data.stargazers_count} title="Star" />
        </div>
      )
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div className="Repo">
        <a className="Repo-link u-linkBlock" href={this.props.data.html_url}>
          <h3 className="Repo-name">{this.props.data.name}</h3>
          <p className="Repo-description u-textTruncate">{this.props.data.description}</p>
          {this.renderStat()}
        </a>
      </div>
    )
  }
});

export default Repo;