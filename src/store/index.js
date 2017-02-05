import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import flow from 'lodash/fp/flow';
import createLogger from 'redux-logger';
import rootReducer from './reducer';

const logger = createLogger({
  collapsed: true,
});

export default function configureStore() {
  return createStore(
    rootReducer,
    flow(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(thunk, logger)
    )
  );
}
