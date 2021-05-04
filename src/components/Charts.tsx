import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import Weather from './WeatherCharts';
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const data = [{ Weather }]

const Charts: React.FC = ()  => {
  const classes  = useStyles();

return <Card className={classes.root}>
    <LineChart  data={data}
          margin={{
            top: 15,
            right: 90,
            left: 0,
            bottom: 15
          }}
          >
    <CartesianGrid strokeDasharray="2 2" />
    <XAxis  dataKey="at"
            type="number"
             />
    <YAxis />  
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f44336"
              strokeWidth={2}
            />
    </LineChart>
</Card>
}
 
 export default Charts;

