<template>
  <div class="summary-panel">
    <!-- The scroller -->
    <Scrollama :offset="0.5" @step-enter="stepEnterHandler">
      <!-- The summary graphic stuck to left side -->
      <div class="graphic" slot="graphic">
        <div class="chart-header ml-3">
          <div class="chart-title">Overall Change from FY20 to FY21</div>
          <div class="chart-diff red">{{ getFormattedChange() }}</div>
          <div class="chart-percent-diff red">{{ getFormattedPercent() }}</div>
        </div>
        <SummaryChart
          ref="summaryChart"
          :rawData="rawData"
          color="#cc3000"
          height="350"
        />
      </div>

      <!-- Step 1: March Proposal -->
      <div class="step" data-step-no="1">
        <p>
          The original March budget proposal totaled $5.24B, the largest budget
          in the City's history and a 4.2% increase over FY20's budget.
        </p>
        <!-- <p class="scroll-to-continue">Scroll to continue</p> -->
      </div>

      <!-- Step 2: May Proposal -->
      <div class="step" data-step-no="2">
        <p>
          As a stay-at-home order began in Philadelphia in late March, the
          city's local economy began to contract and tax revenues fell sharply
          in April and May. The revised May budget, accounting for this revenue
          shortfall, made
          <a
            class="text-link"
            href="https://controller.phila.gov/philadelphia-audits/revised-fy21-fy25-budget/#/spending"
            target="blank_"
            >spending cuts</a
          >
          totaling $341M.
        </p>
      </div>

      <!-- Step 3: June Adopted -->
      <div class="step last" data-step-no="3">
        <p>
          The City revised its economic outlook for FY21 downwards once again in
          mid-June, and the final budget adopted by City Council made an
          additional $90M in spending cuts. The final budget of $4.80B is 4.4%
          less (-$221M) than the City's FY20 budget.
        </p>
      </div>
    </Scrollama>
  </div>
</template>

<script>
import "intersection-observer";
import Scrollama from "vue-scrollama";
import "vue-scrollama/dist/vue-scrollama.css";
import SummaryChart from "@/components/Story/SummaryChart.vue";
import { percentFn, netChangeFormatFn } from "@/utils/formatFns.js";
import * as d3 from "d3";

export default {
  components: {
    Scrollama,
    SummaryChart,
  },
  props: ["rawData"],
  data() {
    return {
      currStep: null,
    };
  },
  computed: {
    FY20_total() {
      return d3.sum(this.rawData, (d) => d["2020 (Adopted)"]);
    },
    FY21_total() {
      return d3.sum(this.rawData, (d) => d["2021 (Adopted)"]);
    },

    smallScreen() {
      return window.screen.width < 768;
    },
  },
  methods: {
    stepEnterHandler({ element }) {
      // Track old and new step numbers
      let oldStepNo = +this.currStep;
      this.currStep = +element.dataset.stepNo;
      if (oldStepNo == this.currStep) return;

      // Highlight new component
      this.$refs.summaryChart.highlightMarker(this.currStep);

      if (!this.smallScreen) {
        let steps = $(".summary-panel .step");
        steps.each((i, x) => {
          if (i == this.currStep - 1) $(x).css("opacity", "1.0");
          else $(x).css("opacity", "0.2");
        });
      }
    },

    getFormattedPercent() {
      let diff = this.FY21_total - this.FY20_total;
      diff /= this.FY20_total;
      return percentFn(diff);
    },
    getFormattedChange() {
      let diff = this.FY21_total - this.FY20_total;
      return netChangeFormatFn(diff);
    },
  },
};
</script>


<style>
.red {
  color: "#ed9da3";
}

.summary-panel .graphic {
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
}
.summary-panel .step:first-child {
  margin-top: 50vh;
  opacity: 1;
}
.summary-panel .step {
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: justify;
  margin-bottom: 25vh;
  margin-top: 25vh;
  opacity: 0.2;
}

@media only screen and (max-width: 767px) {
  .summary-panel .step {
    margin-left: 0rem;
    background-color: rgb(256, 256, 256, 0.9);
    margin-bottom: 75vh;
    opacity: 1;
  }
  .summary-panel .graphic {
    margin-top: 2rem;
  }
}

.summary-panel .step.last {
  margin-bottom: 75vh;
}
.summary-panel .chart-title {
  font-size: 1.5rem;
}
.summary-panel .chart-diff {
  font-size: 1.3rem;
}
.summary-panel .chart-percent-diff {
  font-size: 1.3rem;
}
</style>
