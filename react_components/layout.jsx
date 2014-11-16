var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Container">
        <div className="Content">
          <this.props.activeRouteHandler/>
        </div>
      </div>
    )
  }
});
