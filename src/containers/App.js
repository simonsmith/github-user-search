// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import 'suitcss-base';
import SearchScreen from '../screens/SearchScreen';
import Profile from '../screens/Profile';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact={true} path="/" component={SearchScreen} />
        <Route exact={true} path="/:username" component={Profile} />
      </div>
    </Router>
  );
}
