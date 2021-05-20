import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as UrqlProvider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './reducer';
import Chip from '../../components/Chip';
import { IState } from '../../store';

// Provider from 'urql' renamed UrqlProvider to keep separate from redux provider
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinFahrenheit
  }
}
`;

const measurement = `
subscription($subscription: MeasurementQuery!) {
  newMeasurement( subscription: $subscription) {
    metric
    at
    value
    unit
  }
}
`;

const getWeather = (state: IState) => {
  const { description, locationName, temperatureinFahrenheit  } = state.weather;
  return {
    description,
    locationName,
    temperatureinFahrenheit,
  };
};

const Weather = () => {
  const getLocation = useGeolocation();
  // Default to Houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };
  const dispatch = useDispatch();
  const { temperatureinFahrenheit, description, locationName } = useSelector(getWeather);

  const [result] = useQuery({
    query,
    variables: {
      latLong,
    },
  });
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

  return <Chip label={`Weather in ${locationName}: ${description} and ${temperatureinFahrenheit}°`} />;
};



export default () => {
  return (
    <UrqlProvider value={client}>
      <Weather />
    </UrqlProvider>
  );
};
