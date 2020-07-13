<template>
  <!-- Outside wrapper -->
  <div class="budget-explorer-container">
    <!-- User Toolbar -->
    <div class="title d-flex flex-column justify-content-center mb-5">
      <div>Compare the adopted FY 2021 {{ label }} level to the:</div>
      <div>
        <!-- Year Selection -->
        <MyDropdown
          class="title-dropdown"
          ref="comparisonDropdown"
          :options="comparisonOptions"
          :defaultValue="selectedComparison"
          @change="updateComparisonDropdown($event, 'selectedComparison')"
        />
      </div>
    </div>

    <!-- Budget Explorer Viz -->
    <BudgetExplorerViz
      :width="totalWidth"
      :selectedComparison="selectedComparison"
      :rawData="rawData"
      :viewingOptions="viewingOptions"
      :viewingConfig="viewingConfig"
      :tableConfig="tableConfig"
      :legendConfig="legendConfig"
      :annotationLabels="annotationLabels"
      :vizClass="vizClass"
      :formattedTotalChange="formattedTotalChange"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import MyDropdown from "./MyDropdown";
import RadioButtonToolbar from "./RadioButtonToolbar";
import BudgetExplorerViz from "./BudgetExplorerViz";
import { formatFn } from "@/utils/formatFns";

// Years to show
const COMPARISON = ["2020 (Adopted)", "2021 (Proposed)", "2021 (Revised)"];

export default {
  components: { MyDropdown, RadioButtonToolbar, BudgetExplorerViz },
  props: [
    "label",
    "rawData",
    "tableConfig",
    "legendConfig",
    "viewingConfig",
    "viewingOptions",
    "annotationLabels",
    "vizClass"
  ],
  data() {
    return {
      comparisonOptions: COMPARISON,
      selectedComparison: "2020 (Adopted)"
    };
  },
  mounted() {
    this.updateTotalChangeColor();
  },
  methods: {
    updateTotalChangeColor() {
      // Green or red?
      if (this.totalChange > 0) {
        $(".total-change-number")
          .addClass("green")
          .removeClass("red");
      } else {
        $(".total-change-number")
          .addClass("red")
          .removeClass("green");
      }
    },
    updateComparisonDropdown(selectedComparison, tag) {
      this.selectedComparison = selectedComparison;
      this.updateTotalChangeColor();
    }
  },
  computed: {
    totalWidth() {
      return Math.min(window.screen.width * 0.9, 1000);
    },
    formattedTotalChange() {
      return formatFn(Math.abs(this.totalChange));
    },
    totalChange() {
      let out = 0,
        row;
      for (let i = 0; i < this.rawData.length; i++) {
        row = this.rawData[i];
        out += row["2021 (Adopted)"] - row[this.selectedComparison];
      }
      return out;
    }
  }
};
</script>

<style>
.title {
  font-weight: 700;
  font-size: 2rem;
}
.my-dropdown-menu {
  font-weight: 700;
  font-size: 1.2rem;
}

.total-change {
  font-size: 2rem;
  font-weight: 700;
}
.green {
  color: #398649;
}
.red {
  color: #da3b46;
}
</style>