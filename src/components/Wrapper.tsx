import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
});

export const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};