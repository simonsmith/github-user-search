import React from 'react';
import Router, { Route, DefaultRoute, Redirect } from 'react-router'

import Layout from './layout.jsx';
import Search from './search.jsx';
import UserDetail from './user-detail.jsx';

var routes = (
    <Route name="layout" path="/" handler={Layout}>
      <Route name="users" path="search/users" handler={Search} />
      <Route name="user" path="/users/:username" handler={UserDetail} />
      <DefaultRoute handler={Search} />
      <Redirect from="/" to="users" />
    </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
