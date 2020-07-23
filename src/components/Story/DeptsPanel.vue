<template>
  <div class="depts-panel">
    <!-- The scroller -->
    <Scrollama :offset="0.55" @step-enter="stepEnterHandler">
      <!-- Add graphic for each step -->
      <div class="graphic" slot="graphic">
        <div
          v-for="(config, i) in panelConfig"
          :key="i"
          v-show="checkCurrentStep(config, i)"
        >
          <div class="depts-chart-title">{{ titles[i] }}</div>
          <ChartGroup
            :ref="`chartGroup-${i}`"
            :rawData="rawData"
            :ncolumns="config.ncolumns"
            :names="config.names"
            :height="getHeight(config.ncolumns, config.names.length)"
          />
        </div>
      </div>

      <!-- Group 1 -->
      <div class="step" data-step-no="1" data-highlight-index="[0]">
        <p>
          The budget for the
          <span class="font-weight-bold">Office of Homeless Services</span>
          (OHS) was cut by 27% (<span class="font-weight-bold">-$16M</span>),
          with the majority of cuts made to contracted services. However, this
          loss of local funding is expected to be recovered through federal
          grants made available as part of the national response to the COVID-19
          pandemic.
        </p>
      </div>
      <div class="step" data-step-no="2" data-highlight-index="[1]">
        <p>
          <span class="font-weight-bold">Parks & Recreation</span> was cut by
          16% (<span class="font-weight-bold">-$10.1M</span>), mostly through
          reductions in seasonal staff (60 temporary employees), cuts to funding
          for contracts, and reduced hours and programing at recreation centers.
        </p>
      </div>
      <div class="step" data-step-no="3" data-highlight-index="[2]">
        <p>
          The
          <span class="font-weight-bold">Commerce Department’s</span> budget was
          cut by about two-thirds (<span class="font-weight-bold">-$6.2M</span
          >), mostly through layoffs (about five full-time employees),
          reductions to contracted services, and the elimination of vacant
          positions.
        </p>
      </div>
      <div class="step" data-step-no="4" data-highlight-index="[3]">
        <p>
          The
          <span class="font-weight-bold">Free Library's</span> budget was cut by
          13% (<span class="font-weight-bold">-$6.1M</span>) in FY21, mostly
          through reductions in staff (207 temporary employees), service hours,
          and spending on new materials.
        </p>
      </div>
      <div class="step" data-step-no="5" data-highlight-index="[4]">
        <p>
          Although the final spending reduction for the
          <span class="font-weight-bold">Streets Department</span> was
          relatively small at 2.6%, an expansion of the street cleaning program
          proposed in the March budget was eliminated (<span
            class="font-weight-bold"
            >-$10.5M</span
          >), and staffing was reduced (22 temporary employees).
        </p>
      </div>
      <div class="step" data-step-no="6" data-highlight-index="[5]">
        <p>
          The
          <span class="font-weight-bold"
            >Planning and Development Department</span
          >
          was cut by nearly 30% (<span class="font-weight-bold">-$3.3M</span>),
          with a proposed $7.1M increase to the Land Bank and the
          <a
            href="https://www.phila.gov/2020-03-05-phlrentassist-program-will-stabilize-philadelphia-households/"
            class="text-link"
            target="blank_"
            >PHLRentAssist program</a
          >
          delayed until FY23.
        </p>
      </div>

      <!-- Group 2 -->
      <div class="step" data-step-no="7">
        <p>
          Funding for two departments were eliminated completely, although some
          functions and personnel were transfered to other departments. The
          <span class="font-weight-bold"
            >Office of Arts, Culture, and the Creative Economy</span
          >
          was eliminated (<span class="font-weight-bold">-$4.4M</span>), and the
          <span class="font-weight-bold"
            >Office of the City Representative</span
          >
          was eliminated (<span class="font-weight-bold">-$1.3M</span>).
        </p>
      </div>
      <!-- Group 3 -->
      <div class="step" data-step-no="8" data-highlight-index="[0]">
        <p>
          With the COVID-19 pandemic significantly lowering the City’s main fund
          balance, the City was no longer required to contribute funds to its
          rainy day fund, the
          <span class="font-weight-bold">Budget Stabilization Reserve</span>, in
          FY21 (<span class="font-weight-bold">-$34M</span>).
        </p>
      </div>
      <div class="step" data-step-no="9" data-highlight-index="[1]">
        <p>
          The size of the City's
          <span class="font-weight-bold">Recession Reserve</span>
          decreased in FY21 (<span class="font-weight-bold">-$30.1M</span>). The
          original FY21 budget proposed a total contribution of $56M, about the
          same amount contributed in FY20. Of the $30.1M cut from the Recession
          Reserve, $25M was redirected to
          <span class="font-weight-bold">City Council's</span> budget, leaving
          $25M in the Recession Reserve for FY21.
        </p>
      </div>
      <div class="step" data-step-no="10" data-highlight-index="[2]">
        <p>
          The March proposal included $40M held in the
          <span class="font-weight-bold">Labor Reserve</span> in order to pay
          for future wage increases for the City’s union employees. As the City
          agreed to one-year contracts with the four major unions during FY20,
          the City used the $40M in reserves to pay for the agreed-upon wage
          increases and did not need additional reserves for FY21.
        </p>
      </div>

      <!-- Group 4 -->
      <div class="step" data-step-no="11">
        <p>
          Reduced spending on
          <span class="font-weight-bold">employee benefits</span> (<span
            class="font-weight-bold"
            >-$125M</span
          >) is the largest spending decrease in the adopted FY21 budget.
        </p>
      </div>
      <div class="step" data-step-no="12">
        <p>
          The City proposed restructuring its
          <span class="font-weight-bold"
            >debt service on a pension-related bond</span
          >
          that would free up about
          <span class="font-weight-bold">$75M</span> for operating expenses in
          FY21 at the cost of increasing debt service obligations in future
          years.
        </p>
      </div>
      <div class="step" data-step-no="13">
        <p>
          Each year, the City contributes a portion of
          <span class="font-weight-bold">sales tax revenue</span>
          directly to the
          <span class="font-weight-bold">Municipal Pension Fund</span>. Due to
          the economic impact of COVID-19, this contribution is expected to be
          <span class="font-weight-bold">$27M</span> less in FY21 than the
          adopted FY20 contribution.
        </p>
      </div>
      <div class="step" data-step-no="14">
        <p>
          <span class="font-weight-bold">Health and medical benefit costs</span>
          are expected to decline in FY21 (<span class="font-weight-bold"
            >-$30.7M</span
          >) due to a number of factors, including one-time reductions
          negotiated as part of the recent union contracts, a new hiring freeze,
          and the layoffs of 108 full-time employees.
        </p>
      </div>

      <!-- Group 5 -->
      <div class="step" data-step-no="15" data-highlight-index="[0, 3]">
        <p>
          Funding for Pre-K contracts was transferred from the
          <span class="font-weight-bold">Office of Children and Families</span>
          to the
          <span class="font-weight-bold">Department of Human Services</span>
          (DHS), resulting in a large net increase to the DHS budget (<span
            class="font-weight-bold"
            >+$44.1M</span
          >). Overall, funding for the Pre-K program did not change in FY21.
        </p>
      </div>
      <div class="step" data-step-no="16" data-highlight-index="[1]">
        <p>
          The FY21 budget included an increase to the
          <span class="font-weight-bold"
            >Community College of Philadelphia</span
          >
          (<span class="font-weight-bold">+$10M</span>) over FY20, but less than
          the originally proposed increase (<span class="font-weight-bold"
            >+$21M</span
          >).
        </p>
      </div>
      <div class="step" data-step-no="17" data-highlight-index="[2]">
        <p>
          Similarly, the FY21 budget included an increased contribution to the
          <span class="font-weight-bold">School District</span> (<span
            class="font-weight-bold"
            >+$30M</span
          >), but less than the originally proposed March increase (+$45M).
        </p>
      </div>

      <!-- Group 6 -->
      <div class="step" data-step-no="18" data-highlight-index="[0]">
        <p>
          Funding for crossing guards and public safety officers was moved to
          the
          <span class="font-weight-bold">Managing Director’s Office</span>
          (MDO), shifting
          <span class="font-weight-bold">$13.4M</span> out of the
          <span class="font-weight-bold">Police Department’s</span> payroll
          budget. This change accounts for nearly all of the Police budget's net
          decrease in FY21. Contracted wage increases for the Police Department
          totaling $19.8M in FY21 will be offset by personnel attrition, cuts to
          overtime, and the elimination of upcoming cadet classes.
        </p>
      </div>
      <div class="step" data-step-no="19" data-highlight-index="[1]">
        <p>
          In addition to these transfers from Police, funding for a number of
          other programs was transferred or added to MDO's budget, resulting in
          the adopted budget being higher than the original March proposal. The
          additions include:
        </p>
        <ul>
          <li>
            A contribution to the Philadelphia Cultural Fund for arts and
            culture grants in the city (<span class="font-weight-bold">$1M</span
            >);
          </li>
          <li>
            Funding for the African American Museum (<span
              class="font-weight-bold"
              >+$350,000</span
            >);
          </li>
          <li>
            Funding for the Office of Adult Education (<span
              class="font-weight-bold"
              >+$1.1M</span
            >);
          </li>
          <li>
            Funding to establish a Police Oversight Commission (<span
              class="font-weight-bold"
              >+$400,000</span
            >); and
          </li>
          <li>
            Funding for the Pennsylvania Immigrant Family Unity Project (<span
              class="font-weight-bold"
              >+$200,000</span
            >).
          </li>
        </ul>
      </div>

      <!-- Group 7 -->
      <div class="step last" data-step-no="20" data-highlight-index="[0]">
        <p>
          Cut from the May budget proposal, funding for the
          <span class="font-weight-bold">Housing Trust Fund</span>
          totaling
          <span class="font-weight-bold">$20M</span> in FY21 was restored to the
          <span class="font-weight-bold">Finance Department's</span> budget.
        </p>
      </div>
      <div class="step" data-step-no="21" data-highlight-index="[1]">
        <p>
          Funding for the
          <span class="font-weight-bold">Fire Department</span> increased (<span
            class="font-weight-bold"
            >+$16.5M</span
          >) in FY21, due primarily to increased salary spending from contracted
          wage increases and higher overtime costs.
        </p>
      </div>
      <div class="step" data-step-no="22" data-highlight-index="[2]">
        <p>
          Funding originally earmarked for the
          <span class="font-weight-bold">Recession Reserve</span> was given to
          <span class="font-weight-bold">City Council</span> for
          <a
            class="text-link"
            href="http://phlcouncil.com/wp-content/uploads/2020/06/New-NormalBudget-Act-Fact-Sheet.png"
            target="blank_"
            >discretionary spending</a
          >
          (<span class="font-weight-bold">+$25M</span>).
        </p>
      </div>
    </Scrollama>
    <div
      class="explore font-italic font-weight-bold text-center pb-5"
      style="font-size: 1.4rem;"
    >
      Explore the FY21 budget changes for all departments below.
    </div>
  </div>
</template>

<script>
import "intersection-observer";
import Scrollama from "vue-scrollama";
import "vue-scrollama/dist/vue-scrollama.css";
import * as d3 from "d3";
import ChartGroup from "@/components/Story/ChartGroup.vue";

export default {
  components: {
    Scrollama,
    ChartGroup,
  },
  props: ["rawData"],
  data() {
    return {
      currStep: null,
      titles: [
        "Departments With Large Cuts",
        "Eliminated Departments",
        "Cuts to Reserves",
        "Lower Benefits Costs",
        "Education Spending",
        "Changes to the Police Budget",
        "Other Notable Increases",
      ],
      panelConfig: [
        {
          names: [
            "Commerce",
            "Streets",
            "Homeless Services",
            "Parks & Rec",
            "Free Library",
            "Planning & Development",
          ],
          ncolumns: 3,
          steps: [1, 2, 3, 4, 5, 6],
        },
        {
          names: [
            "Arts, Culture, and the Creative Economy",
            "City Representative",
          ],
          ncolumns: 2,
          steps: [7],
        },
        {
          names: [
            "Recession Reserve",
            "Labor Reserve",
            "Budget Stabilization Reserve",
          ],
          ncolumns: 3,
          steps: [8, 9, 10],
        },
        {
          names: ["Employee Benefits"],
          ncolumns: 1,
          steps: [11, 12, 13, 14],
        },
        {
          names: [
            "Community College Subsidy",
            "School District Contribution",
            "Children and Families",
            "Human Services",
          ],
          ncolumns: 2,
          steps: [15, 16, 17],
        },
        {
          names: ["Managing Director", "Police"],
          ncolumns: 2,
          steps: [18, 19],
        },
        {
          names: ["Fire", "Finance", "City Council"],
          ncolumns: 3,
          steps: [20, 21, 22],
        },
      ],
    };
  },
  computed: {
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

      // Set the opacity
      if (!this.smallScreen) {
        let steps = $(".depts-panel .step");
        steps.each((i, x) => {
          if (i == this.currStep - 1) $(x).css("opacity", "1.0");
          else $(x).css("opacity", "0.2");
        });
      }

      // Highlight the chart
      this.$nextTick(() => {
        let indices = element.dataset.highlightIndex;
        if (indices) {
          indices = JSON.parse(indices);

          let chart_number, index;
          for (let i = 0; i < this.panelConfig.length; i++) {
            index = this.panelConfig[i].steps.indexOf(this.currStep);

            if (index !== -1) {
              chart_number = i;
              break;
            }
          }

          if (chart_number != undefined) {
            this.$refs[`chartGroup-${chart_number}`][0].highlightBox(indices);
          }
        }

        // manually trigger resize due to apexcharts bug
        window.dispatchEvent(new Event("resize"));
      });
    },
    checkCurrentStep(config, i) {
      if ((this.currStep == null) & (i == 0)) return true;

      return config.steps.indexOf(this.currStep) !== -1;
    },
    getHeight(ncolumns, total) {
      if (ncolumns == 1) return 175;
      else if (ncolumns == 2) {
        if (total == 2) return this.smallScreen ? 125 : 150;
        else return this.smallScreen ? 100 : 125;
      } else if (ncolumns == 3) {
        if (total == 3) return this.smallScreen ? 125 : 150;
        else return this.smallScreen ? 100 : 125;
      }
      return 125;
    },
  },
};
</script>

<style>
.depts-panel .scrollama-graphic {
  display: flex;
  justify-content: center;
  align-items: center;
}

.depts-panel .graphic {
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
}
.depts-panel .step {
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  text-align: justify;
  margin-bottom: 25vh;
  margin-top: 25vh;
  opacity: 0.2;
}

@media only screen and (max-width: 767px) {
  .depts-panel .step {
    margin-left: 0rem;
    background-color: rgb(256, 256, 256, 0.9);
    margin-bottom: 75vh;
    opacity: 1;
  }
  .explore {
    margin-top: 5rem;
  }
  .depts-chart-title {
    font-size: 1.4rem;
    padding-bottom: 0.5rem;
  }
  .depts-panel .graphic {
    margin-top: 2rem;
  }
}

.depts-panel .step:first-child {
  margin-top: 50vh;
  opacity: 1;
}

.depts-chart-title {
  font-size: 1.6rem;
  font-weight: 700;
  font-style: italic;
  padding-bottom: 1.5rem;
  text-align: left;
}
</style>
