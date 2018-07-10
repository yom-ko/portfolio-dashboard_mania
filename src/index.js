import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { saveState } from 'utils/localStorage';

import store, { history } from 'store';

// Import App component
import HotApp from 'screens/App';

// Save state to the browser's localStorage
store.subscribe(() => {
  saveState({
    todolist: {
      todos: {
        todosById: store.getState().todolist.todos.todosById
      }
    }
  });
});

// Define App target node
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
