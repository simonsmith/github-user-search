// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'suitcss-base';
import SearchScreen from '../screens/SearchScreen';
import Profile from '../screens/Profile';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/search" component={SearchScreen} />
        <Route exact={true} path="/:username" component={Profile} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  );
}
