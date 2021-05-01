import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
});

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

Wrapper.propTypes = {
  children: PropTypes,
};

export default Wrapper;
