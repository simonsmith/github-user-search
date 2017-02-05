import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducer';

const logger = createLogger({
  collapsed: true,
});

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
}
