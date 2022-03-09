<template>
  <home-page></home-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomePage from '@/views/HomePage.vue'; // @ is an alias to /src

@Options({
  components: {
    HomePage,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.swal2-container {
  font-family: 'Raleway', sans-serif !important;
}

* {
  margin: 0;
  padding: 0;
}

:root {
  --primary: #dfdfe7;
  --secondary: #d5d5e4;
  --dark: #d2d1d6;
  --gray: #e2e2f0;
  --leftbar-side: 31%;
  --top: #5e747a;
  --light: #454546;
  --lightgray:#7a8080;;
}
</style>
