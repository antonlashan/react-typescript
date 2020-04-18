import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

type ButtonProgressProps = {
  animate: boolean;
} & ButtonProps;

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -8,
      marginLeft: -12,
    },
  })
);

const ButtonProgress = ({
  animate,
  children,
  disabled,
  ...rest
}: ButtonProgressProps) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(animate);
  }, [animate]);

  const handleButtonClick = () => {
    setTimeout(() => {
      setLoading(true);
    });
  };

  return (
    <div className={classes.wrapper}>
      <Button
        disabled={disabled || loading}
        onClick={handleButtonClick}
        {...rest}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default ButtonProgress;
