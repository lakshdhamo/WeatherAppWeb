<template>
  <section>
    <div class="spinner-container" v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="container" v-else>
      <div class="temperature-unit">
        <button @click="changeUnit('C')" :class="{ active: unit === 'C' }">
          °C
        </button>
        <button @click="changeUnit('F')" :class="{ active: unit === 'F' }">
          °F
        </button>
      </div>
      <HourlyChart :hourlyData="transformedHourlyWeather"></HourlyChart>
      <forecast-block></forecast-block>
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import CalculateTemperature from "@/mixins/CalculateTemperature";
import GetWeatherImage from "@/mixins/GetWeatherImage";
import { Unit } from "@/store/unit/types";
import { CompassPoint, Forecast, Hourly, Weather } from "@/store/weather/types";
import { Options, mixins } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import ForecastBlock from "./ForecastBlock.vue";
import BaseSpinner from "./UI/BaseSpinner.vue";
import HourlyChart from "./HourlyChart.vue";

@Options({
  methods: {
    ...mapActions(["changeUnit"]),
  },
  computed: {
    ...mapGetters([
      "unit",
      "isLoading",
      "forecasts",
      "currentWeather",
      "hourlyWeather",
    ]),
  },
  components: {
    BaseSpinner,
    ForecastBlock,
    HourlyChart,
  },
})
export default class App extends mixins(CalculateTemperature, GetWeatherImage) {
  changeUnit!: (unit: Unit) => void;
  declare unit: Unit;
  isLoading!: boolean;
  currentWeather!: Weather;
  hourlyWeather!: Hourly[];

  get transformedHourlyWeather(): Hourly[] {
    return this.hourlyWeather.map((data) => ({
      hour: data.hour,
      temperature: this.calculateTemperature(data.temperature),
    }));
  }
}
</script>

<style scoped>
section {
  background: var(--lightgray);
  height: 100%;
  z-index: 10;
}

.spinner-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 40px 0;
}

.temperature-unit {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.temperature-unit button {
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--secondary);
  color: #110e3c;
  transition: 0.3s all ease-in-out;
}

.temperature-unit button:first-child {
  margin-right: 12px;
}

.temperature-unit button:hover {
  background-color: #514f6d;
}

.temperature-unit button:focus {
  box-shadow: 0px 0px 1px 3px #58567681;
}

.temperature-unit button.active:focus {
  box-shadow: 0px 0px 1px 3px #e7e7eb7a;
}

.temperature-unit button.active {
  background-color: var(--light);
  color: #fff;
  cursor: default;
}

h3 {
  font-size: 18px;
  color: var(--secondary);
  margin-bottom: 32px;
  margin-top: 12px;
  font-weight: 700;
}

@media (min-width: 768px) {
  .temperature-unit {
    justify-content: flex-end;
  }
}

@media (min-height: 768px) {
  h3 {
    font-size: 20px;
  }
}
</style>
