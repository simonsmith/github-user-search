var React =  require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Layout = React.createClass({
  render: function() {
    return (
      <div className="Content">
        <RouteHandler />
      </div>
    )
  }
});

module.exports = Layout;
