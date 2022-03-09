<template>
  <h3>Hourly forecast</h3>
  <Chart
    :size="{ width: 700, height: 300 }"
    :data="hourlyData"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Area
        :dataKeys="['hour', 'temperature']"
        type="monotone"
        :areaStyle="{ fill: 'url(#grad)' }"
      />
      <Line
        :dataKeys="['hour', 'temperature']"
        type="monotone"
        :lineStyle="{
          stroke: '#3d3c44',
        }"
      />
      <defs>
        <linearGradient id="grad" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#4c476e" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          hour: { color: '#9f7aea' },
          avg: { hide: true },
          inc: { hide: true },
        }"
      />
    </template>
  </Chart>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Chart, Grid, Line, Tooltip, Area } from "vue3-charts";

export interface HourlyVal {
  time: number;
  temperature: number;
}

export default defineComponent({
  props: {
    hourlyData: Array,
  },
  name: "HourlyChart",
  components: { Chart, Grid, Line, Tooltip, Area },
  setup() {
    const direction = ref("horizontal");
    const margin = ref({
      left: 10,
      top: 20,
      right: 20,
      bottom: 10,
    });

    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 25"],
        type: "linear",
        ticks: 8,
      },
    });

    return { direction, margin, axis };
  },
});
</script>