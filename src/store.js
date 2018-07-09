import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const composedEnhancers = composeEnhancers(
  applyMiddleware(...middleware),
  ...enhancers
);

// create the app store
export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);

// run the saga
sagaMiddleware.run(rootSaga);
