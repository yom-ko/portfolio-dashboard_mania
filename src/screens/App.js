import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Global, css } from '@emotion/core';

// Import fontawesome helper and icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignInAlt,
  faSpinner,
  faAngleUp,
  faEquals,
  faPlus,
  faMinus,
  faTimes,
  faDivide,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Import shared `Loading...` component
import Loading from 'components/Loading';

// Import site-wide layout and page components
import Layout from 'screens/app/Layout';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ 'screens/Home'),
  loading: Loading
});
const Todolist = Loadable({
  loader: () => import(/* webpackChunkName: 'todolist' */ 'screens/Todolist'),
  loading: Loading
});
const Stories = Loadable({
  loader: () => import(/* webpackChunkName: 'stories' */ 'screens/Stories'),
  loading: Loading
});
const Calc = Loadable({
  loader: () => import(/* webpackChunkName: 'calc' */ 'screens/Calc'),
  loading: Loading
});
const Login = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ 'screens/Login'),
  loading: Loading
});

// Import Bulma styles (shared by all components)
import 'screens/app/styles.sass';

// Import custom fonts
import digital7Font from 'screens/app/fonts/digital7.woff';

// Initialize custom fontawesome library with icons
library.add(
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
  <Layout>
    <Global
      styles={css`
        @font-face {
          font-family: 'Digital7';
          font-style: normal;
          font-weight: 400;
          src: url(${digital7Font}) format('woff');
        }
      `}
    />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/todolist" component={Todolist} />
      <Route path="/stories" component={Stories} />
      <Route path="/calc" component={Calc} />
      <Route path="/login" component={Login} />
      <Redirect from="*" to="/" />
    </Switch>
  </Layout>
);

export default App;
