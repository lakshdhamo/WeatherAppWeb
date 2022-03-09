<template>
  <main>
    <current-weather-bar></current-weather-bar>
    <search-weather-bar></search-weather-bar>
    <advanced-weather-details></advanced-weather-details>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CurrentWeatherBar from "@/components/CurrentWeatherBar.vue";
import SearchWeatherBar from "@/components/SearchWeatherBar.vue";
import AdvancedWeatherDetails from "@/components/AdvancedWeatherDetails.vue";

@Options({
  components: { CurrentWeatherBar, SearchWeatherBar, AdvancedWeatherDetails },
})
export default class HomePage extends Vue {}
</script>

<style scoped>
main {
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  overflow: auto;
}

@media (min-width: 768px) {
  main {
    grid-template-columns: var(--leftbar-side) 69%;
    min-height: 100vh;
    overflow: hidden;
  }
}
</style>
