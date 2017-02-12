// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-base';
import SearchScreen from '../screens/SearchScreen';
import Profile from '../screens/Profile';

export default function App() {
  return (
    <Router>
      <div className={css(styles.App)}>
        <Switch>
          <Route exact={true} path="/search" component={SearchScreen} />
          <Route exact={true} path="/:username" component={Profile} />
          <Redirect to="/search" />
        </Switch>
      </div>
    </Router>
  );
}

const styles = StyleSheet.create({
  App: {
    padding: 15,
    maxWidth: 1060,
  },
});
