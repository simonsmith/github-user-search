// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Search from '../screens/Search';
import Profile from '../screens/Profile';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Search} />
        <Route exact path="/:username" component={Profile} />
      </div>
    </Router>
  );
}
