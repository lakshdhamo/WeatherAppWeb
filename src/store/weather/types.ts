export type WeatherState =
    | 'Snow'
    | 'Sleet'
    | 'Hail'
    | 'Thunderstorm'
    | 'Heavy Rain'
    | 'Light Rain'
    | 'Rain'
    | 'Showers'
    | 'Heavy Cloud'
    | 'Light Cloud'
    | 'Clouds'
    | 'Clear';

export type CompassPoint =
    | 'N'
    | 'E'
    | 'S'
    | 'W'
    | 'NE'
    | 'SE'
    | 'SW'
    | 'NW'
    | 'NNE'
    | 'ENE'
    | 'ESE'
    | 'SSE'
    | 'SSW'
    | 'WSW'
    | 'WNW'
    | 'NNW';

export interface Hourly {
    hour: string;
    temperature: number;
}

export interface Forecast {
    minTemperature: number;
    maxTemperature: number;
    weatherStateName: WeatherState;
    date: Date;
}

export interface Weather {
    locationId: number;
    locationName: string;
    currentDate: Date;
    currentTemperature: number;
    airPressure: number;
    humidity: number;
    visibility: number;
    windSpeed: number;
    windDirectionCompass: CompassPoint;
    weatherStateName: WeatherState;
}

export interface Data {
    weather: Weather;
    forecasts: Forecast[];
    hourly: Hourly[]
}

export interface State {
    isLoading: boolean;
    error: string | null;
    data: Data;
}


