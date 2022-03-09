<template>
  <aside>
    <div class="spinner-container" v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="container" v-else>
      <div class="header"></div>
      <div class="temperature">
        <h3>
          <span>{{ currentTemperature }}</span>
          <span class="unit">°{{ unit }}</span>
        </h3>
      </div>
      <h4 class="type">{{ weatherStateName }}</h4>

      <div class="details">
        <!-- Wind Status -->
        <div class="row type">
          <div class="column">
            <h5>Wind Status :</h5>
          </div>
          <div class="column">
            <p>
              <span>{{ windSpeed }}</span>
              <span class="unit">mph</span>
              <span>{{ windDirection }}</span>
            </p>
          </div>
        </div>

        <!-- Humidity -->
        <div class="row type">
          <div class="column">
            <h5>Humidity :</h5>
          </div>
          <div class="column">
            <p>
              <span>{{ humidity }}</span>
              <span class="unit">%</span>
            </p>
          </div>
        </div>

        <!-- Visibility -->
        <div class="row">
          <div class="column">
            <h5 class="type">Visibility :</h5>
          </div>
          <div class="column">
            <p class="type">
              <span>{{ visibility }}</span>
              <span class="unit">Miles</span>
            </p>
          </div>
        </div>

        <!-- Air Pressure -->
        <div class="row">
          <div class="column">
            <h5 class="type">Air Pressure :</h5>
          </div>
          <div class="column">
            <p class="type">
              <span>{{ airPressure }}</span>
              <span class="unit">mb</span>
            </p>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="date">
          <span>Today</span>
          <span class="separator">-</span>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="location">
          <img src="../assets/icons/location_on-white-24dp.svg" alt="" />
          <span>{{ currentWeather.locationName }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Unit } from "@/store/unit/types";
import { CompassPoint, Weather } from "@/store/weather/types";
import { Options, mixins } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import CalculateTemperature from "../mixins/CalculateTemperature";
import GetWeatherImage from "../mixins/GetWeatherImage";
import BaseSpinner from "./UI/BaseSpinner.vue";

@Options({
  emits: ["on-search"],
  computed: {
    ...mapGetters(["currentWeather", "unit", "isLoading"]),
  },
  methods: {
    ...mapActions(["getWeatherFromCoordinates"]),
  },
  components: { BaseSpinner },
})
export default class extends mixins(CalculateTemperature, GetWeatherImage) {
  declare unit: Unit;
  currentWeather!: Weather;
  isLoading!: boolean;

  getWeatherFromCoordinates!: (payload: {
    latitude: number;
    longitude: number;
  }) => void;

  get formattedDate(): string {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      weekday: "short",
    }).format(this.currentWeather.currentDate);
  }

  get weatherStateName(): string {
    return this.currentWeather.weatherStateName;
  }

  get currentTemperature(): number {
    return Math.round(
      this.calculateTemperature(this.currentWeather.currentTemperature)
    );
  }

  get weatherImage(): string {
    return this.getWeatherImage(this.currentWeather.weatherStateName);
  }

  get formattedUnit(): string {
    return `°${this.unit}`;
  }

  round(value: number) {
    return Math.round(value);
  }

  get windSpeed(): number {
    return this.round(this.currentWeather.windSpeed);
  }

  get windDirection(): CompassPoint {
    return this.currentWeather.windDirectionCompass;
  }

  get windCompassStyle(): object {
    type Map = {
      [point in CompassPoint]: number;
    };
    const map: Map = {
      N: 0,
      NNE: 22,
      NE: 45,
      ENE: 67,
      E: 90,
      ESE: 112,
      SE: 135,
      SSE: 158,
      S: 180,
      SSW: 202,
      SW: 225,
      WSW: 247,
      W: 270,
      WNW: 293,
      NW: 315,
      NNW: 337,
    };
    return {
      transform: `rotate(${map[this.windDirection]}deg)`,
    };
  }

  get humidity(): number {
    return this.round(this.currentWeather.humidity);
  }

  get airPressure(): number {
    return this.round(this.currentWeather.airPressure);
  }

  get visibility(): number {
    return this.round(this.currentWeather.visibility);
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  white-space: nowrap;
  text-align: right;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: none;
  clear: both;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}

aside {
  height: 100vh;
  background-color: var(--light);
}

.spinner-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 100%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.header {
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

.search {
  padding: 0 18px;
  font-size: 16px;
}

.temperature h3 {
  text-align: center;
  color: var(--secondary);
  font-size: 96px;
  font-weight: 500;
}

.temperature .unit {
  color: var(--gray);
  font-size: 48px;
}

.type {
  color: var(--gray);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}

.footer {
  padding-bottom: 20px;
  box-sizing: border-box;
}

.footer .date {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  font-size: 18px;
  font-weight: 500;
}

.footer .separator {
  margin: 0 15px;
}

.footer .location {
  color: var(--gray);
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

@media (min-width: 768px) {
  aside {
    height: 100%;
  }
}

@media (min-height: 768px) {
  .header {
    padding: 30px 40px 0px 40px;
  }
  .temperature h3 {
    font-size: 120px;
  }

  .weather-symbol img {
    width: 212px;
  }

  .footer {
    padding-bottom: 40px;
  }
}
</style>
