import { CompassPoint } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import { Data, Weather, Forecast, Hourly } from './types';
import { constants } from '../../constants/constants';

export default function getTransformedData(data: any, place: string): Data {

    const val = Math.floor((data.windDegree / 22.5) + .5);
    const dir = constants.WIND_DIRECTIONS[(val % 16)];

    const currentWeather: Weather = {
        locationId: 1,
        locationName: place,
        currentDate: new Date(`${data.currentDate} 00:00:00`),
        currentTemperature: data.temperature,
        airPressure: data.pressure,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        windDirectionCompass: dir as CompassPoint,
        weatherStateName: data.weather,
        visibility: data.visibility,
    };

    const forecasts: Forecast[] = data.forecasts.map(
        (consolidatedWeather: any) => ({
            date: new Date(`${consolidatedWeather.forecastDate} 00:00:00`),
            minTemperature: consolidatedWeather.minimum,
            maxTemperature: consolidatedWeather.maximum,
            weatherStateName: consolidatedWeather.weather,
        }),
    );

    const hourly: Hourly[] = data.hourlyWeather.map(
        (hourlyData: any) => ({
            hour: hourlyData.hour,
            temperature: hourlyData.temperature
        })
    );

    const transformedData: Data = {
        weather: currentWeather,
        forecasts,
        hourly
    };

    return transformedData;
}

