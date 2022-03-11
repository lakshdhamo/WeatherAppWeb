# weatherapp

## Project details:
1. Single-File Components - (aka *.vue files, abbreviated as SFC) is a special file format that allows us to encapsulate the template, logic, and styling of a Vue component in a single file
2. BaseSpinner - loader to be shown when API hit happending
3. AdvancedWeatherDetails - Contains temperature switch option - Celsius / Fahrenheit, Hourly weather report, Forecase weather report. Hourly & Forecast parameters (number of) will be configured in backend service
4. ForecastBlock - Displays forecast data
5. HourlyChart - Displays hourly report - Used `vue3-charts` component
6. SearchWeatherBar - Used to get City name and search city list
7. Store - Used Location, Unit, Weather stores to maintain the state

## Project Configuration
Backend service API URL can be configured in `src/services/serviceApi.ts`

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
