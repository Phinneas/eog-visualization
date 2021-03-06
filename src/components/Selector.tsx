import React, { useState, useEffect } from 'react';
import Select, { ActionMeta, OptionTypeBase, OptionsType, ValueType,  } from 'react-select';
import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import { actions } from '../Features/Charts/reducer';

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    locationName
    description
    temperatureinCelsius
  }
}
`;

interface Option extends OptionTypeBase {
  label: string;
  value: string;
}

export const Selector: React.FC = () => {
  const [result] = useQuery({
    query,
  });
  const dispatch = useDispatch();
  const [options, setOptions] = useState<OptionsType<Option>>([]);
  const { data, error } = result;

  const onChange = (selected: ValueType<Option, true>, action: ActionMeta<Option>) => {
    const selectedMetrics = selected ? selected.map((item: Option) => item.value) : [];
    dispatch(actions.metricNamesSelected({ selectedMetrics, metricName: action.name }));
  };

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) return;
    const { getWeatherForLocation } = data;
    setOptions(getWeatherForLocation.map((option: string) => ({ label: option, value: option })));
  }, [dispatch, data, error]);

  return <Select name="metricSelect" options={options} isMulti closeMenuOnSelect={false} onChange={onChange} />;
};