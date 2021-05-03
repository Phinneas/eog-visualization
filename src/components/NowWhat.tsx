import React from 'react';
import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from './CardHeader';
import Charts from './Charts';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Houston Weather" />
      <CardContent>
        
          <Charts />
  
      </CardContent>
    </Card>
  );
};
