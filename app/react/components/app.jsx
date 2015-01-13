import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router'

import Layout from './layout.jsx';
import Search from './search.jsx';
import UserDetail from './user-detail.jsx';

var routes = (
    <Route name="layout" path="/" handler={Layout}>
      <Route name="users" path="/users" handler={Search} />
      <Route name="user" path="/users/:username" handler={UserDetail} />
      <DefaultRoute handler={Search} />
    </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
