import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import flow from 'lodash/fp/flow';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/Root';
import rootSaga from './sagas';

const logger = createLogger({
  collapsed: true,
});
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    flow(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(
        logger,
        sagaMiddleware
      )
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
