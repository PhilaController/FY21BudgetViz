<template>
  <div>
    <apexchart
      ref="chart"
      :height="height"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import * as d3 from "d3";

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ["rawData", "name", "color", "height"],
  data() {
    return {
      labels: [
        "FY20 Adopted",
        "March FY21 Proposal",
        "May FY21 Proposal",
        "FY21 Adopted"
      ],
      columns: [
        "2020 (Adopted)",
        "2021 (Proposed)",
        "2021 (Revised)",
        "2021 (Adopted)"
      ],
      chartOptions: {
        chart: {
          toolbar: { show: false },
          animations: { enabled: false },
          zoom: {
            enabled: false
          }
        },
        grid: { padding: { left: 50, right: 50, top: 0, bottom: 20 } },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "solid",
          opacity: 0.35,
          colors: [this.color]
        },
        stroke: {
          curve: "straight",
          colors: [this.color]
        },
        tooltip: {
          style: { fontSize: "1rem" },
          enabled: true,
          marker: { show: false },
          y: {
            formatter: x => `$${d3.format(",.3f")(x / 1e9)}B`,
            title: {
              formatter: seriesName => ""
            }
          },
          x: { show: true }
        },
        markers: {
          size: 6,
          strokeColor: this.color,
          colors: ["#ffffff"],
          strokeWidth: 3,
          discrete: []
        },
        states: {
          hover: {
            filter: {
              type: "none"
            }
          },
          active: {
            filter: {
              type: "none"
            }
          }
        },
        yaxis: {
          labels: {
            formatter: x => `$${d3.format(",.1f")(x / 1e9)}B`,
            style: { fontSize: "1rem" }
          }
        },
        xaxis: {
          tooltip: {
            enabled: false
          },
          labels: {
            style: { fontSize: "1rem" },
            rotate: -20,
            rotateAlways: true
          },
          crosshairs: { show: false },
          categories: [
            "FY20 Adopted",
            "March FY21 Proposal",
            "May FY21 Proposal",
            "FY21 Adopted"
          ]
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          annotations: {
            position: "back",
            yaxis: [
              {
                y: this.series[0].data[0],
                borderColor: "#000",
                borderWidth: 3,
                strokeDashArray: 0,
                label: {
                  borderWidth: 0,
                  offsetY: -7,
                  style: {
                    color: "#000",
                    background: "#fff",
                    fontSize: "1rem"
                  },
                  text: "FY20 Adopted"
                }
              }
            ]
          }
        }
      };
    });
  },
  methods: {
    highlightMarker(i) {
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          markers: {
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: +i,
                fillColor: "#fff",
                strokeColor: this.color,
                size: 12
              }
            ]
          }
        }
      };
    }
  },
  computed: {
    series() {
      let out = [];
      for (let i = 0; i < this.columns.length; i++) {
        out.push(d3.sum(this.rawData, d => d[this.columns[i]]));
      }

      return [
        {
          name: "Budget",
          data: out,
          type: "area"
        }
      ];
    }
  }
};
</script>



