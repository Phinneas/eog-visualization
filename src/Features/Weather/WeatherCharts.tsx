import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Provider as UrqlProvider, createClient, useSubscription } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './reducer';
import { IState } from '../../store';

// Provider from 'urql' renamed Urql Provider to keep redux provider understanding separate

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurement = `
subscription($subscription: MeasurementQuery!) {
  newMeasurement( subscription: $subscription) {
    metric
    at
    value
    unit
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

  const getWeather = (state: IState) => {
    const { temperatureinFahrenheit } = state.weather;
    return {
      temperatureinFahrenheit,
     
    };
  };
  const { temperatureinFahrenheit  } = useSelector(getWeather);

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

  return <Chart {...data`${temperatureinFahrenheit}°`}/>

};

export default () => {
  return (
    <UrqlProvider value={client}>
      <Chart />
    </UrqlProvider>
  );
};
