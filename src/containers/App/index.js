// @flow

import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import SearchScreen from 'screens/Search/SearchScreen';
import Profile from 'screens/Profile/ProfileScreen';
import DefaultLayout from 'screens/Default';

export default function App() {
  return (
    <Router>
      <Switch>
        <DefaultLayout exact={true} path="/search" component={SearchScreen} />
        <DefaultLayout exact={true} path="/:username" component={Profile} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  );
}
