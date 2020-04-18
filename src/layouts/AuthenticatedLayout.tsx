import React, { ReactNode } from 'react';
import { Header } from '../layouts/Header';
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { AppDrawer } from '../layouts/Drawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
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

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header />
      <AppDrawer />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
