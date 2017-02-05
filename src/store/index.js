import {
  createStore,
  applyMiddleware,
} from 'redux';
import GitHub from 'github-api';
import thunk from 'redux-thunk';
import flow from 'lodash/fp/flow';
import createLogger from 'redux-logger';
import rootReducer from './reducer';

const api = new GitHub();
const logger = createLogger({
  collapsed: true,
});

export default function configureStore() {
  return createStore(
    rootReducer,
    flow(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(thunk.withExtraArgument(api), logger)
    )
  );
}
