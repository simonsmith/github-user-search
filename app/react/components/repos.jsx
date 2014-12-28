var React = require('react');

var Repos = React.createClass({
  render: function() {
    return (
      <div className="Repos">
        <h2>Popular Repositories</h2>
        {this.props.repos}
      </div>
    )
  }
});

module.exports = Repos;
