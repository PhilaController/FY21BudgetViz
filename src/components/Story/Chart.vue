<template>
  <div>
    <apexchart
      :height="height"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import * as d3 from "d3";

function currencyFormatter(x) {
  return `$${d3.format(",.1f")(x / 1e6)}M`;
}

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["rawData", "name", "color", "height"],
  data() {
    return {
      columns: [
        "2020 (Adopted)",
        "2021 (Proposed)",
        "2021 (Revised)",
        "2021 (Adopted)",
      ],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          animations: { enabled: false },
          zoom: {
            enabled: false,
          },
          sparkline: { enabled: true },
        },
        grid: { padding: { left: 20, right: 20, top: 20, bottom: 20 } },
        dataLabels: {
          enabled: false,
        },
        annotations: {
          position: "back",
          yaxis: [
            {
              y: this.rawData[this.columns[0]],
              fillColor: "#444444",
              borderWidth: 3,
              strokeDashArray: 0,
              label: {
                borderWidth: 0,
                text: "",
              },
            },
          ],
        },
        fill: {
          type: "solid",
          opacity: 0.35,
          colors: [this.color],
        },
        stroke: {
          curve: "straight",
          colors: [this.color],
        },
        tooltip: {
          style: { fontSize: "1rem" },
          enabled: true,
          marker: { show: false },
          y: {
            formatter: currencyFormatter,
            title: {
              formatter: (seriesName) => "",
            },
          },
          x: { show: true },
        },
        markers: {
          size: 6,
          strokeColor: this.color,
          colors: ["#ffffff"],
          strokeWidth: 3,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active: {
            filter: {
              type: "none",
            },
          },
        },
        xaxis: {
          tooltip: {
            enabled: false,
          },
          crosshairs: { show: false },
          categories: [
            "FY20 Adopted",
            "March FY21 Proposal",
            "May FY21 Proposal",
            "FY21 Adopted",
          ],
        },
      };
    },
    series() {
      let out = [];
      for (let i = 0; i < this.columns.length; i++) {
        out.push(this.rawData[this.columns[i]]);
      }

      return [
        {
          name: "Budget",
          data: out,
          type: "area",
        },
      ];
    },
  },
};
</script>



