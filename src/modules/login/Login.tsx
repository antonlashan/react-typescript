import React from "react";
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
import axios from "axios";
import ButtonProcess from "../../components/ButtonProcess";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

type UserData = {
  id: string;
  picture: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  address: string;
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
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: "onChange",
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const onSubmit = handleSubmit((formData) => {
    setLoading(true);
    setShowAlert(false);
    axios.get<UserData[]>(`/mocks/login.json`).then(({ data }) => {
      const user = data.find((user) => user.email === formData.email);
      console.log(user);
      if (!user) {
        setShowAlert(true);
      }
      setLoading(false);
    });
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
        <ButtonProcess
          animate={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!formState.isValid}
        >
          Sign In
        </ButtonProcess>
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
};

export default Login;
