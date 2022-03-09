import { ActionTree } from 'vuex';
import Swal from 'sweetalert2';
import searchApi from '@/services/serviceApi';
import { Data, State } from './types';
import getTransformedData from './utility';


const actions: ActionTree<State, unknown> = {
    async getWeatherFromCoordinates(context, payload) {
        context.commit('startLoading');
        try {
            const { latitude, longitude } = payload;
            const { data } = await searchApi.get(`/WeatherForecast/${latitude}/${longitude}`);
            const place = context.rootGetters.location.name + ', ' + context.rootGetters.location.country;
            const transformedData: Data = getTransformedData(data, place);

            context.commit('setData', transformedData);
        } catch (error: any) {
            context.commit('setError', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `It was not possible to get the data: ${error.message}`,
            });
        } finally {
            context.commit('stopLoading');
        }
    },

};

export default actions;
