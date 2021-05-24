import React from 'react';
import { Provider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Grid } from '@material-ui/core';
import { Selector } from '../../components/Selector';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { Graph } from '../../components/Graph';
import { LatestValue } from '../../components/LastValue';

const subscriptionClient = new SubscriptionClient(`ws://react.eogresources.com/graphql`, {
  reconnect: true,
});

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

export default () => {
  return (
    <Provider value={client}>
      <Charts />
    </Provider>
  );
};

const getSelectedMetrics = (state: IState) => state.charts.selectedMetrics;

const Charts = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  return (
    <Grid container>
      <Grid container item xs={12} spacing={4}>
        <Grid item container spacing={2} direction="row-reverse">
          <Grid item xs={12} md={6} lg={5}>
            <Selector />
          </Grid>
          <Grid item lg={7} md={6} xs={12}>
            <Grid container spacing={2}>
              <LatestValue selectedMetrics={selectedMetrics} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} justify="center" alignItems="center">
          <Graph selectedMetrics={selectedMetrics} />
        </Grid>
      </Grid>
    </Grid>
  );
};
