<template>
  <h3>{{ transformedForecasts.length }}-day Forecast</h3>
  <div class="weather-forecast">
    <div
      :key="forecast.date"
      v-for="forecast in transformedForecasts"
      class="weather"
    >
      <h5>{{ forecast.date }}</h5>
      <img :src="forecast.weatherStateImage" alt="" />
      <div class="temperatures">
        <span class="max"
          >{{ forecast.maxTemperature }} {{ formattedUnit }}</span
        >
        <span class="min"
          >{{ forecast.minTemperature }} {{ formattedUnit }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Forecast } from "@/store/weather/types";
import { mixins, Options, Vue } from "vue-class-component";
import GetWeatherImage from "@/mixins/GetWeatherImage";
import CalculateTemperature from "@/mixins/CalculateTemperature";
import { mapGetters } from "vuex";

interface TransformedForecasts {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherStateImage: string;
}

@Options({
  computed: {
    ...mapGetters(["forecasts"]),
  },
})
export default class extends mixins(CalculateTemperature, GetWeatherImage) {
  forecasts!: Forecast[];

  get transformedForecasts(): TransformedForecasts[] {
    return this.forecasts.map((forecast) => ({
      date: this.formatDate(forecast.date),
      minTemperature: this.round(
        this.calculateTemperature(forecast.minTemperature)
      ),
      maxTemperature: this.round(
        this.calculateTemperature(forecast.maxTemperature)
      ),
      weatherStateImage: this.getWeatherImage(forecast.weatherStateName),
    }));
  }
  formatDate(date: Date): string {
    if (date.getDay() === new Date().getDay()) {
      return "Today";
    }
    if (date.getDay() === new Date().getDay() + 1) {
      return "Tomorrow";
    }
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      weekday: "short",
    }).format(date);
  }

  get formattedUnit(): string {
    return `°${this.unit}`;
  }

  round(value: number) {
    return Math.round(value);
  }
}
</script>

<style scoped>
.weather-forecast {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
}

.weather {
  background: var(--light);
  padding: 15px;
  width: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-weight: 500;
  font-size: 1em;
  color: var(--secondary);
  margin-bottom: 20px;
}

.weather h5 {
  text-align: center;
}

.weather img {
  width: 58px;
  margin: 20px auto;
}

.weather .temperatures {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.weather .min {
  color: var(--gray);
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: 700;
}
</style>