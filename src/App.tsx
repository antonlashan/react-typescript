import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import LoginLayout from "./layouts/LoginLayout";
import { PrivateRoute } from "./components/AuthRoute";
import { AuthContext, currentUser } from "./services/authentication.service";

// import Login from "./modules/login/Login";
// import Home from "./modules/home/Home";
// import About from "./modules/about/About";

const Home = React.lazy(() => import("./modules/home/Home"));
const About = React.lazy(() => import("./modules/about/About"));
const Login = React.lazy(() => import("./modules/login/Login"));

function App() {
  return (
    <Router>
      <AuthContext.Provider value={currentUser()}>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Redirect exact path="/" to="login" /> */}
            <Route path={["/login"]}>
              <LoginLayout>
                <Switch>
                  <Route path="/login" component={Login} />
                </Switch>
              </LoginLayout>
            </Route>
            <Route path={["/home", "/about"]}>
              <AuthenticatedLayout>
                <Switch>
                  <PrivateRoute path="/home" component={Home} />
                  <PrivateRoute path="/about" component={About} />
                </Switch>
              </AuthenticatedLayout>
            </Route>
            <Route path="*">
              <Redirect exact to="login" />
            </Route>
          </Suspense>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
