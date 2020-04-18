import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import LoginLayout from './layouts/LoginLayout';
import { AuthRoute } from './components/AuthRoute';
import { AuthContext, currentUser } from './services/authentication.service';

// import Login from "./modules/login/Login";
// import Home from "./modules/home/Home";
// import About from "./modules/about/About";

const Home = loadable(() => import('./modules/home/Home'));
const About = loadable(() => import('./modules/about/About'));
const Login = loadable(() => import('./modules/login/Login'));

function App() {
  return (
    <Router>
      <AuthContext.Provider value={currentUser()}>
        <Switch>
          <Redirect exact path="/" to="login" />
          <Route path={['/login']}>
            <LoginLayout>
              <Switch>
                <Route path="/login" component={Login} />
              </Switch>
            </LoginLayout>
          </Route>
          <Route path={['/home', '/about']}>
            <AuthenticatedLayout>
              <Switch>
                <AuthRoute path="/home" component={Home} />
                <AuthRoute path="/about" component={About} />
              </Switch>
            </AuthenticatedLayout>
          </Route>
          <Route path="*">
            <Redirect exact to="login" />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
