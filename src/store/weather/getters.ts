import { GetterTree } from 'vuex';
import { Forecast, State, Weather, Hourly } from './types';

const getters: GetterTree<State, unknown> = {
  getCurrentLocationId(store: State): number {
    return store.data.weather.locationId;
  },
  currentWeather(store: State): Weather {
    return store.data.weather;
  },
  forecasts(store: State): Forecast[] {
    return store.data.forecasts;
  },
  hourlyWeather(store: State): Hourly[] {
    return store.data.hourly;
  },
  isLoading(store: State): boolean {
    return store.isLoading;
  },
};

export default getters;
