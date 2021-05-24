import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Provider from 'urql' renamed UrqlProvider to keep separate from redux provider
import { Provider as UrqlProvider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './reducer';
import Chip from '../../components/Chip';
import { IState } from '../../store';

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    locationName
    description
    temperatureinCelsius
  }
}
`;

const getWeather = (state: IState) => {
  const { locationName, description, temperatureinFahrenheit,  } = state.weather;
  return {
    locationName,
    description,
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
  const { locationName, description, temperatureinFahrenheit,  } = useSelector(getWeather);

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
