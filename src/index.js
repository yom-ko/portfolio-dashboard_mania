import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { saveState } from 'utils/localStorage';

import store from 'store';

// Import App component
import App from 'screens/App';

// Save state to the browser's localStorage
store.subscribe(() => {
  saveState({
    todolist: {
      todos: {
        todosById: store.getState().todolist.todos.todosById,
        filter: 'ALL'
      }
    }
  });
});

// Define App target node
const target = document.querySelector('#app');

// Render App
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  target
);
