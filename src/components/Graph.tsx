import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { red, green, indigo, pink, blue, yellow } from '@material-ui/core/colors';
import { useSelector } from 'react-redux'
import { IState } from '../store';
import { makeStyles } from '@material-ui/core';


const unitAdder = (value: number): string => {
    if (value >= 1000) {
        return (value / 1000).toString() + 'K';
    } else {
        return value.toString();
    }
}

const getAxisID = (metric: string) => (metric.toLowerCase().endsWith('')) ? 1 : (metric.toLowerCase().endsWith('temp') ? 2 : 0);

const getMetrics = (state: IState) => {
    const { metrics } = state.charts;
    return metrics;
}

const lineColors = [red[600], pink[500], blue[500], yellow[500], indigo[400], green[500]]

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        height: '100vh',
    },
    main: {
        padding: theme.spacing(3),
        background: 'white'
    },
}));

interface IChartProps {
    selectedMetrics: string[];
}

export const Graph: React.FC<IChartProps> = ({ selectedMetrics }) => {
    const metrics = useSelector(getMetrics);
    const classes = useStyles();
    const data = Object.keys(metrics).map(key => metrics[key])

    const units = {
        temperature: selectedMetrics.some((m: string) => getAxisID(m) === 2)
    }

    return <div className={classes.container}>
        <ResponsiveContainer>
            <LineChart
                width={600}
                height={600}
                data={data}
            >
                {
                    selectedMetrics.map((metric, index) => {
                        return <Line
                            key={metric}
                            yAxisId={getAxisID(metric)}
                            dataKey={metric}
                            stroke={lineColors[index]}
                            dot
                            activeDot
                        />
                    })
                }
                {
                    selectedMetrics.length > 0 &&
                    <XAxis dataKey="at" interval={150} />
                }
                {
                    units.temperature &&
                    <YAxis
                        label={{ value: 'F', position: 'insideTopLeft', offset: 0, fill: '#908e8e', fontSize: 12, dy: 10, dx: 10, angle: -90 }}
                        yAxisId={2}
                        orientation="left"
                        stroke={'#908e8f'}
                        tick={{ fontSize: 11 }}
                        tickFormatter={unitAdder}
                    />
                }
            
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
        </div>
};