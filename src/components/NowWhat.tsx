import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from './CardHeader';
import { Charts } from './Charts'
const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export const NowWhat: React.FC = () => {
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
