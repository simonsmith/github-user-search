// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as StyleProvider} from 'react-fela';
import {createRenderer} from 'fela';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import css from 'css';
import App from 'containers/App';

import configureStore from './store';

// Display easier to read classNames in dev
const enhancers = process.env.NODE_ENV === 'development'
  ? [monolithic({prettySelectors: true})]
  : [];

const store = configureStore();
const renderer = createRenderer({
  enhancers,
  plugins: [
    ...webPreset,
  ],
});

css(renderer.renderStatic);

ReactDOM.render(
  <StoreProvider store={store}>
    <StyleProvider renderer={renderer}>
      <App />
    </StyleProvider>
  </StoreProvider>,
  document.getElementById('root')
);
