import React from 'react';
import {createRenderer} from 'fela';
import renderer from 'react-test-renderer';
import {renderToString} from 'fela-tools';
import {Provider} from 'react-fela';

const prettifyFelaString = str => str.replace(/\.[a-z]+/g, '\n    $&');

export default function felaSnapshot(component) {
  const felaRenderer = createRenderer();

  return {
    component: renderer.create(
      <Provider renderer={felaRenderer}>
        {component}
      </Provider>
    ).toJSON(),
    styles: prettifyFelaString(renderToString(felaRenderer)),
  };
}
