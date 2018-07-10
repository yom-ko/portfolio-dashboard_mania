import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { injectGlobal } from 'react-emotion';

// Import fontawesome helper and icons
import fontawesome from '@fortawesome/fontawesome';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

// Import high-level components
import MainNavbar from 'screens/app/MainNavbar';
import Home from 'screens/Home';
import TodoList from 'screens/TodoList';
import Stories from 'screens/Stories';

// Import common (Bulma) styles and images
import 'screens/app/styles.sass';
import raven from 'screens/app/images/raven.jpg';
import wooden from 'screens/app/images/wooden.jpg';

// Initialize custom fontawesome library with icons
fontawesome.library.add(faSignInAlt, faSpinner);

// Set custom styles
injectGlobal`
  body {
    background-image: url('${raven}'), url('${wooden}');
    background-blend-mode: screen;
  }
`;

// App component with routes
export const App = () => (
  <div>
    <header>
      <MainNavbar />
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/todolist" component={TodoList} />
      <Route exact path="/stories" component={Stories} />
    </main>
  </div>
);

export default hot(module)(App);
