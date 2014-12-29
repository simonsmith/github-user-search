var React = require('react');

var Repo = React.createClass({
  render: function() {
    return (
      <div className="Repo">
        <a className="Repo-link" href={this.props.data.html_url}>
          <h3 className="Repo-name">{this.props.data.name}</h3>
          <p className="Repo-description">{this.props.data.description}</p>
        </a>
      </div>
    )
  }
});

module.exports = Repo;