import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider as UrqlProvider, createClient, useSubscription } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from '../Features/Weather/reducer';

// Provider from 'urql' renamed Urql Provider to keep redux provider understanding separate

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurement = `
subscription($measurement: Measurement!) {
  newMeasurement(Measurement: $measurement) {
    metric
    at
    value
  }
}
`

const Chart = () => {
  const getLocation = useGeolocation();
  // Default to Houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: measurement
    }  
  );

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getWeatherForLocation } = data;
    dispatch(actions.weatherDataRecevied(getWeatherForLocation));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;


  return <Chart />

};



export default () => {
  return (
    <UrqlProvider value={client}>
      <Chart />
    </UrqlProvider>
  );
};
