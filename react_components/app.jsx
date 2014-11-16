var React =         require('react');
var Router =        require('react-router');
var Route =         Router.Route;
var Routes =        Router.Routes;
var DefaultRoute =  Router.DefaultRoute;

var Layout =  require('./layout.jsx');
var Search =  require('./search.jsx');

var routes = (
  <Routes>
    <Route name="layout" path="/" handler={Layout}>
      <Route name="search" path="/:username" handler={Search} />
      <DefaultRoute handler={Search}/>
    </Route>
  </Routes>
);

React.render(routes, document.body);
