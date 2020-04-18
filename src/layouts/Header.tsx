import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { currentUser } from '../services/authentication.service';
import { subscriber, drawerService } from '../services/drawer.service';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
  })
);

export function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    subscriber.subscribe((t) => {
      setOpen(t);
    });

    return function cleanup() {
      subscriber.unsubscribe();
    };
  }, []);

  const currUser = currentUser();

  const handleDrawerOpen = () => {
    drawerService.toggleDrawer(!open);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen()}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} noWrap>
          React with typescript {open === true ? 'true' : 'false'}
        </Typography>
        <Button color="inherit" to="/" component={Link}>
          Logout ({currUser?.name.first})
        </Button>
      </Toolbar>
    </AppBar>
  );
}
