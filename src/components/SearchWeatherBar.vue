<template>
  <transition
    enter-active-class="bar-enter-active"
    leave-active-class="bar-leave-active"
  >
    <div class="search-container">
      <div class="container">
        <form class="search-bar" @submit.prevent="getLocations">
          <div :class="{ focused: isInputFocused }">
            <span>
              <img src="../assets/icons/search-black-18dp.svg" alt="" />
            </span>
            <input
              type="text"
              placeholder="Enter City name or Zip code"
              v-model="searchQuery"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
          </div>
          <button type="submit">Search</button>
          <button class="btn icon" @click="handleGetCurrentLocation">
            <img
              src="../assets/icons/gps_fixed-24px.svg"
              alt="User Current location"
            />
          </button>
        </form>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul class="locations" v-else-if="showLocationList">
          <li
            v-for="location in locations"
            :key="location.woeid"
            role="button"
            @click="getNewData(location, $event)"
          >
            <span>{{ location.name + ", " + location.country }}</span>
            <img
              src="../assets/icons/keyboard_arrow_right-black-18dp.svg"
              alt=""
            />
          </li>
        </ul>
        <p v-if="locations.length == 0" class="empty-message">
          No Locations founded
        </p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import { Location } from "@/store/location/types";

@Options({
  components: { BaseSpinner },
  emits: ["on-close"],
  methods: {
    ...mapActions(["getLocationBasedOnCityOrZipCode"]),
    ...mapActions(["getWeatherFromCoordinates"]),
    ...mapActions(["setLocation"]),
  },
})
export default class extends Vue {
  getLocationBasedOnCityOrZipCode!: (
    searchQuery: string
  ) => Promise<Location[]>;

  getWeatherFromCoordinates!: (payload: {
    latitude: number;
    longitude: number;
  }) => void;

  setLocation!: (location: Location) => void;
  showLocationList = false;
  isInputFocused = false;
  searchQuery = "";
  locations: Location[] = [];
  isLoading = false;

  handleInputFocus() {
    this.isInputFocused = true;
  }

  handleInputBlur() {
    this.isInputFocused = false;
  }

  // eslint-disable-next-line class-methods-use-this
  handleGetCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.getWeatherFromCoordinates(position.coords);
    });
  }

  async getLocations() {
    if (this.searchQuery) {
      this.isLoading = true;
      try {
        this.getLocationBasedOnCityOrZipCode(this.searchQuery).then((data) => {
          this.locations = data;
          this.showLocationList = true;
        });
      } catch (error: any) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: `Error while searching locations: ${error.message}`,
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

  resetSearch() {
    this.showLocationList = false;
    this.searchQuery = "";
  }

  getNewData(location: Location, event: Event) {
    this.resetSearch();
    this.setLocation(location);
    const latitude = location.latitude;
    const longitude = location.longitude;
    this.getWeatherFromCoordinates({ latitude, longitude });
  }
}
</script>

<style scoped>
.search-container {
  background-color: var(--light);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  width: 100%;
  margin-top: 30px;
}

.container {
  position: relative;
  width: 90%;
  margin: auto;
}

.bar-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
}

.bar-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
}

.search-bar {
  width: 100%;
  display: flex;
}

.search-bar div {
  width: 75%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border: 1px solid var(--secondary);
  transition: all 0.3s ease-in-out;
}

.search-bar div.focused {
  box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.2);
}

.search-bar span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  min-width: 35px;
}

.search-bar input {
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 1em;
  color: var(--secondary);
  flex-shrink: 1;
}

.search-bar button {
  border: none;
  outline: none;
  font-size: 1em;
  background: #3d3c44;
  border: 1px solid #a09fb1;
  color: #fff;
  cursor: pointer;
  padding: 12px 0;
  width: 23%;
  margin-left: 2%;
  transition: all 0.3s ease-in-out;
}

.search-bar button:hover {
  background: #1e213a;
  border: 1px solid #1e213a;
}

.search-bar button:focus {
  box-shadow: 0px 0px 1px 3px #3c48e954;
}

.search-bar input::placeholder {
  color: #616475;
}

.locations {
  list-style: none;
  margin-top: 35px;
}

.locations li {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  color: var(--secondary);
  border: 1px solid transparent;
  cursor: pointer;
}

.locations img {
  display: none;
}

.locations li:hover {
  border: 1px solid #616475;
}

.locations li:hover img {
  display: block;
}

.empty-message {
  color: var(--secondary);
  margin-top: 35px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 50px !important;
  background-color: #6e707a !important;
  color: var(--secondary);
  border: none !important;
  outline: none !important;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: #606269 !important;
}

.btn:focus {
  box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.2) !important;
}

.icon {
  width: 40px;
  border-radius: 100%;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translate(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translate(-100%);
  }
}

@media (min-width: 768px) {
  .search-container {
    width: var(--leftbar-side);
    position: fixed;
  }
}
</style>
