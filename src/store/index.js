import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import flow from 'lodash/fp/flow';
import debounce from 'lodash/fp/debounce';
import isNull from 'lodash/fp/isNull';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/Root';
import rootSaga from './sagas';

const CACHE_KEY = 'github-user-cache';

const logger = createLogger({
  collapsed: true,
});
const sagaMiddleware = createSagaMiddleware();

function saveState(state: Object) {
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem(CACHE_KEY, serialized);
  } catch (e) {
    console.warn('There was an problem saving the state');
  }
}

function loadState() {
  try {
    const serialized = sessionStorage.getItem(CACHE_KEY);
    if (isNull(serialized)) {return undefined;}
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
}

export default function configureStore() {
  const cachedState = loadState();
  const store = createStore(
    rootReducer,
    cachedState,
    flow(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(
        logger,
        sagaMiddleware
      )
    ),
  );
  sagaMiddleware.run(rootSaga);

  store.subscribe(debounce(2000, () => {
    const {cache, entities} = store.getState();
    saveState({cache, entities});
  }));

  return store;
}
