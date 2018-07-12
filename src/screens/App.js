import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
// import { injectGlobal } from 'react-emotion';

// Import fontawesome helper and icons
import fontawesome from '@fortawesome/fontawesome';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

// Import high-level components
import MainHeader from 'screens/app/MainHeader';
import MainNavbar from 'screens/app/MainNavbar';
import MainContent from 'screens/app/MainContent';
import Home from 'screens/Home';
import TodoList from 'screens/TodoList';
import Stories from 'screens/Stories';

// Import common (Bulma) styles and images
import 'screens/app/styles.sass';

// Initialize custom fontawesome library with icons
fontawesome.library.add(faSignInAlt, faSpinner, faAngleUp);

// App component with routes
export const App = () => (
  <div>
    <MainHeader>
      <MainNavbar />
    </MainHeader>
    <MainContent>
      <Route exact path="/" component={Home} />
      <Route exact path="/todolist" component={TodoList} />
      <Route exact path="/stories" component={Stories} />
    </MainContent>
  </div>
);

export default hot(module)(App);
