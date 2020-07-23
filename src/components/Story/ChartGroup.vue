<template>
  <div class="chart-wrapper" :style="gridStyle">
    <template v-for="(d, i) in selectedData">
      <div class="chart-box" :key="i">
        <div class="chart-header">
          <div class="chart-title">{{ d.name }}</div>
          <div class="chart-diff" :style="{ color: getColor(d.diff) }">
            {{ getFormattedChange(d) }}
          </div>
          <div class="chart-percent-diff" :style="{ color: getColor(d.diff) }">
            {{ getFormattedPercent(d) }}
          </div>
        </div>
        <div class="chart">
          <Chart
            :rawData="d"
            :name="d.name"
            :color="getColor(d.diff)"
            :height="height"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Chart from "./Chart.vue";
import * as d3 from "d3";
import { percentFn, netChangeFormatFn } from "@/utils/formatFns.js";

export default {
  components: { Chart },
  props: ["ncolumns", "names", "rawData", "height"],
  data() {
    return {
      reds: d3
        .scaleSequential()
        .interpolator(
          d3.interpolateRgbBasis(["#da3b46", "#e05b65", "#e67c84", "#ed9da3"])
        )
        .domain([-100e6, 0])
        .clamp(true),
      greens: d3
        .scaleSequential()
        .interpolator(
          d3.interpolateRgbBasis(["#9fc6a7", "#7db188", "#5b9b69", "#398649"])
        )
        .domain([0, 50e6])
        .clamp(true)
    };
  },
  methods: {
    highlightBox(indices) {
      let boxes = $(this.$el).find(".chart-box");
      boxes.css("background-color", "#fff");
      for (let i = 0; i < indices.length; i++)
        boxes.eq(indices[i]).css("background-color", "rgb(255, 239, 162, 0.4)");
    },
    getFormattedPercent(d) {
      return percentFn(d.percent_diff);
    },
    getFormattedChange(d) {
      return netChangeFormatFn(d.diff);
    },
    getColor(diff) {
      if (diff == 0) return "#666666";
      else if (diff < 0) return d3.color(this.reds(diff)).formatHex();
      else return d3.color(this.greens(diff)).formatHex();
    }
  },
  computed: {
    gridStyle() {
      let width = (100 / this.ncolumns).toFixed(2);
      let display = "grid";
      if (this.ncolumns == 1) display = "flex";

      return {
        display: display,
        gridTemplateColumns: `repeat(${this.ncolumns}, minmax(0, ${width}%))`
      };
    },
    selectedData() {
      return this.rawData.filter(x => this.names.indexOf(x.name) !== -1);
    }
  }
};
</script>

<style>
.chart-wrapper {
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
  justify-content: center;
}

.chart-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}
.chart-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
}
.chart-title {
  font-size: 1.3rem;
  min-height: 20px;
  font-weight: 700;
}
@media only screen and (max-width: 767px) {
  .chart-title {
    font-size: 1rem;
  }
  .chart-diff,
  .chart-percent-diff {
    font-size: 0.9rem;
  }
}
.chart-diff,
.chart-percent-diff {
  font-size: 1.1rem;
  font-weight: 700;
}
</style>