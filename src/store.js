import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';
import { loadState } from 'utils/localStorage';

const preloadedState = loadState();

const enhancers = [];

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

// create the store
export default createStore(rootReducer, preloadedState, composedEnhancers);

// run the saga
sagaMiddleware.run(rootSaga);
