<template>
  <BudgetExplorer
    label="spending"
    vizClass="spending-explorer"
    :rawData="rawData"
    :viewingOptions="viewingOptions"
    :viewingConfig="viewingConfig"
    :tableConfig="tableConfig"
    :legendConfig="legendConfig"
    :annotationLabels="annotationLabels"
  />
</template>

<script>
import BudgetExplorer from "./BudgetExplorer";
import { percentFn, netChangeFormatFn, formatFn } from "@/utils/formatFns";

export default {
  components: { BudgetExplorer },
  data() {
    return {
      annotationLabels: ["Budget increases", "Budget cuts"],
      viewingOptions: ["All Changes"],
      tableConfig: {
        grouped: ["All Changes"],
        groupby: {
          "All Changes": "name"
        },
        childColumns: {},
        headerColumns: [
          {
            label: "Name",
            field: "name",
            required: true
          },
          {
            label: "Major Class",
            field: "major_class_description",
            required: true
          }
        ]
      },
      rawData: require("@/data/budget_changes_by_major_class.json")
    };
  },
  computed: {
    smallScreen() {
      return window.screen.width <= 768;
    },
    legendConfig() {
      return {
        sizes: this.smallScreen ? [5e6, 125e6] : [5e6, 50e6, 125e6],
        colorScaleDomain: [-1, 1],
        label: "budgeted spending"
      };
    },
    viewingConfig() {
      return {
        "All Changes": {
          columns: 1,
          height: 400,
          force_type: "charge",
          force_strength: 0.3
        }
      };
    }
  }
};
</script>
