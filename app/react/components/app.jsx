var React =         require('react');
var Router =        require('react-router');
var Route =         Router.Route;
var DefaultRoute =  Router.DefaultRoute;

var Layout =  require('./layout.jsx');
var Search =  require('./search.jsx');
var Profile = require('./profile.jsx');

var routes = (
    <Route name="layout" path="/" handler={Layout}>
      <Route name="users" path="/users" handler={Search} />
      <Route name="user" path="/users/:username" handler={Profile} />
      <DefaultRoute handler={Search} />
    </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
