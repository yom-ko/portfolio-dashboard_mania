import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';

// Import App component
import HotApp from 'screens/App';

const target = document.querySelector('#app');

// Render App
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HotApp />
    </ConnectedRouter>
  </Provider>,
  target
);
