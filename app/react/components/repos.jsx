var React = require('react');

var Repos = React.createClass({
  render: function() {
    return (
      <div className="Repos">
        <h1>Popular Repositories</h1>
        <pre>
          {this.props.repos}
        </pre>
      </div>
    )
  }
});

module.exports = Repos;
