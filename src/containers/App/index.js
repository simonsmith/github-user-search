// @flow

import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import SearchScreen from 'screens/Search/SearchScreen';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import MainScreen from 'screens/Main/MainScreen';

export default function App() {
  return (
    <Router>
      <Switch>
        <MainScreen exact={true} path="/search" component={SearchScreen} />
        <MainScreen exact={true} path="/:username" component={ProfileScreen} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  );
}
