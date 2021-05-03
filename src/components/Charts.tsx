import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import Weather from '../Features/Weather/Weather';

const data = [{ Weather }]
 const Charts: React.FC = ()  => {
  
  return <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>;
}


 export default Charts;