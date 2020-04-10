import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import LoginLayout from "./layouts/LoginLayout";

import Login from "./modules/login/Login";
import Home from "./modules/home/Home";
import About from "./modules/about/About";

// const Home = React.lazy(() => import("./modules/home/Home"));
// const About = React.lazy(() => import("./modules/about/About"));
// const Login = React.lazy(() => import("./modules/login/Login"));

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path={["/login"]}>
            <LoginLayout>
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </LoginLayout>
          </Route>
          <Route exact path={["/home", "/about"]}>
            <AuthenticatedLayout>
              <Switch>
                <Route exact path="/home">
                  <Home />
                </Route>

                <Route exact path="/about">
                  <About />
                </Route>
              </Switch>
            </AuthenticatedLayout>
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
