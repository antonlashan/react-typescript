import React from "react";
import {
  Link,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm } from "react-hook-form";

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
}));

function Login() {
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: "onChange",
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!formState.isValid}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default Login;
