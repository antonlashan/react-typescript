import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./layouts/Header";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { AppDrawer } from "./layouts/Drawer";

const Home = React.lazy(() => import("./modules/home/Home"));
const About = React.lazy(() => import("./modules/about/About"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header />
        <AppDrawer />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              {/* <section> */}
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              {/* </section> */}
            </Suspense>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
