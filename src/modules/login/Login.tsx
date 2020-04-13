import React from "react";
import { useHistory } from "react-router-dom";
import {
  Link,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";

import ButtonProgress from "../../components/ButtonProgress";
import { login, logout } from "../../services/authentication.service";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: "onChange",
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  React.useEffect(() => {
    logout();
  }, []);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true);
    setShowAlert(false);

    // simulate like actual time for respond
    setTimeout(async () => {
      const user = await login(email, password);
      setLoading(false);
      if (user === null) {
        setShowAlert(true);
      } else {
        return history.push("/home");
      }
    }, 1000);
  });

  const classes = useStyles();
  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          error={errors.email !== undefined}
          helperText={errors.email?.message}
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          autoFocus
          inputRef={register({
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email.",
            },
          })}
        />
        <TextField
          error={errors.password !== undefined}
          helperText={errors.password?.message}
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          inputRef={register({ required: "Password is required." })}
        />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
          name="remember"
          inputRef={register}
        />
        {showAlert && (
          <div className={classes.alert}>
            <Alert variant="outlined" severity="error">
              Email or password incorrect
            </Alert>
          </div>
        )}
        <ButtonProgress
          animate={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!formState.isValid}
        >
          Sign In
        </ButtonProgress>
        <Grid container>
          <Grid item xs>
            <Link href="/mocks/login.json" target="_blank" variant="body2">
              Credintials
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Login;
