import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as chartsReducer } from '../Features/Charts/reducer';
export default {
  weather: weatherReducer,
  charts: chartsReducer
};
