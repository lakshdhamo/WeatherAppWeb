/* eslint-disable no-param-reassign */
import { Module } from 'vuex';
import { Location } from './types';
import Swal from 'sweetalert2';
import searchApi from '@/services/serviceApi';

interface State {
  location: Location;
}

const locationModule: Module<State, unknown> = {
  state: {
    location: {
        name: 'Berlin',
        country: 'DE',
        latitude: 0,
        longitude: 0,
    }
  },
  mutations: {
    setLocation(store, location: Location) {
      store.location = location;
    },
  },
  actions: {
    setLocation(context, location: Location) {
      context.commit('setLocation', location);
    },

    async getLocationBasedOnCityOrZipCode(context, searchQuery): Promise<Location[]> {
        context.commit('startLoading');
        let locations: Location[] = [];
        try {

            const { data } = await searchApi.get(
                "/WeatherForecast/" + searchQuery
            );
            locations = data.slice(0, 5).map((location: any) => ({
                name: location.name,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
            }));

            return locations;
        } catch (error: any) {
            Swal.fire({
                title: 'Error!',
                text: `It was not possible to get your location: ${error.message}`,
                icon: 'error',
            });
        }
        
        return locations;
    },

  },
  getters: {
    location(store): Location {
      return store.location;
    },
  },
};

export default locationModule;
