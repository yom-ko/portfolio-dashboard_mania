import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { injectGlobal } from 'react-emotion';

// Import fontawesome helper and icons
import fontawesome from '@fortawesome/fontawesome';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faEquals from '@fortawesome/fontawesome-free-solid/faEquals';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faDivide from '@fortawesome/fontawesome-free-solid/faDivide';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';

// Import high-level components
import MainHeader from 'screens/app/MainHeader';
import MainNavbar from 'screens/app/MainNavbar';
import MainContent from 'screens/app/MainContent';
import Home from 'screens/Home';
import TodoList from 'screens/TodoList';
import Stories from 'screens/Stories';
import Calc from 'screens/Calc';

// Import Bulma styles (shared between all components)
import 'screens/app/styles.sass';

import digitalFont from 'screens/app/fonts/digital7_monoItalic.woff';

injectGlobal`
  @font-face {
  font-family: 'Digital7';
  font-style: normal;
  font-weight: 400;
  src: url(${digitalFont}) format('woff');
}
`;

// Initialize custom fontawesome library with icons
fontawesome.library.add(
  faSignInAlt,
  faSpinner,
  faAngleUp,
  faEquals,
  faPlus,
  faMinus,
  faTimes,
  faDivide,
  faArrowLeft
);

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
      <Route exact path="/calc" component={Calc} />
    </MainContent>
  </div>
);

export default hot(module)(App);
