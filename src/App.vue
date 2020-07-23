<template>
  <div id="app" class="w-100">
    <div class="intro">
      <p>
        Over the last several months of fiscal year 2020 (FY20), the City of
        Philadelphia has faced unprecedented challenges and changes to its
        budget and planning process. In early March, Mayor Kenney presented the
        <a
          class="text-link"
          href="https://www.phila.gov/media/20200324135241/FYP-FullLayout-Final_ONLINE_3.23.pdf"
          target="blank_"
          >Five Year Plan for FY21 through FY25</a
        >, which included a $5.24 billion (B) spending plan for FY21, the
        largest budget in the City’s history. By May, the economic turmoil
        created by the COVID-19 pandemic left the City with an estimated $650
        million (M) budget shortfall for FY21, prompting City officials to
        <a
          href="https://www.phila.gov/media/20200501080717/REVISED-FY21-25-Five-Year-Plan-Proposed.pdf"
          class="text-link"
          target="blank_"
          >revise</a
        >
        the Five Year Plan proposal with departmental cuts and tax rate
        increases. The Plan was
        <a
          href="https://www.phila.gov/media/20200615131539/Budget-Update-June-15-2020.pdf"
          class="text-link"
          target="blank_"
          >again revised</a
        >, as lower-than-expected tax collections had increased the revenue
        shortfall to $750M and widespread protests calling for police reform and
        changes to the Police budget continued throughout June. Following
        negotiations between the mayor and City Council, a
        <a
          href="https://www.phila.gov/finance/pdfs/Operating%20Budget/FY21_Budget_in_Brief_Adopted_FINAL.pdf"
          target="blank_"
          class="text-link"
          >final budget</a
        >
        for FY21 was adopted by City Council on June 25.
      </p>

      <p>
        The original March budget proposed a 4.2% increase (+$211M) to FY20
        spending levels, adding additional funding in a number of areas,
        including education, housing, and public safety. It included increased
        contributions to the School District and Community College of
        Philadelphia, as well as funding for a new citywide street cleaning
        program. However, many of these proposed spending increases, along with
        other existing programs, were reduced or eliminated when the revised
        budget was released in May 2020.
      </p>
      <p>
        Compared to the original March budget, the revised May budget made
        <a
          class="text-link"
          href="https://controller.phila.gov/philadelphia-audits/revised-fy21-fy25-budget/#/spending"
          target="blank_"
          >spending cuts</a
        >
        totaling $341M, cutting the original proposal by 6.5%. These proposed
        cuts included the elimination of the Offices of Arts and Culture and the
        City Representative, as well as substantial cuts to the Departments of
        Commerce, Streets, City Commissioners, and Planning and Development.
        Other large cuts were made to proposed contributions to the City’s
        reserves as well as the School District, Community College of
        Philadelphia, and the Housing Trust Fund. Amidst these proposed cuts,
        funding increased from the March budget for a few departments, including
        the Police and Fire Departments.
      </p>

      <p>
        The final budget, adopted in June, included some changes to the revised
        budget, with a few departments having some level of funding reinstated
        and others, such as the Police Department, experiencing cuts. The final
        FY21 budget of $4.80B is $221M less than the FY20 budget, a decrease
        that affected all departments, though some more severely than others.
        These budget changes are described in more detail in the budget
        visualization tool below.
      </p>
    </div>

    <!-- Summary Panel -->
    <SummaryPanel :rawData="dataOverTime" />

    <hr />
    <h2 class="mt-5">Budget Changes for Individual Departments</h2>
    <div class="font-italic" style="font-size: 1.2rem">
      Key changes for specific departments are highlighted below.
    </div>

    <!-- Depts Panel -->
    <DeptsPanel :rawData="dataOverTime" />

    <hr class="mt-5" />
    <h2 class="mt-5">FY21 Budget Explorer</h2>
    <div class="font-italic pb-2" style="font-size: 1.2rem">
      Changes from the FY20 to FY21 adopted budgets are shown below for all
      departments.
    </div>

    <!-- Spending Explorer -->
    <SpendingExplorer class="mt-5" />
  </div>
</template>

<script>
import SpendingExplorer from "@/components/SpendingExplorer/";
import SummaryPanel from "@/components/Story/SummaryPanel.vue";
import DeptsPanel from "@/components/Story/DeptsPanel.vue";
import * as d3 from "d3";

export default {
  name: "app",
  components: { SpendingExplorer, DeptsPanel, SummaryPanel },
  data() {
    return {};
  },
  computed: {
    dataOverTime() {
      let d = require("@/data/budget_changes_over_time.json");

      // Add Fulltime positions
      d.push({
        "2020 (Adopted)": 23778,
        "2021 (Proposed)": 24987,
        "2021 (Revised)": 24154,
        "2021 (Adopted)": 23980,
        name: "Budgeted Full-Time Positions"
      });

      // Add percent change
      let r, diff, percent_diff;

      // Add diff and percent diff
      for (let i = 0; i < d.length; i++) {
        r = d[i];

        // Diff b/w 2021 and 2020
        diff = r["2021 (Adopted)"] - r["2020 (Adopted)"];

        // Percent diff
        percent_diff = diff / r["2020 (Adopted)"];
        if (isNaN(percent_diff)) percent_diff = 0;

        // Save
        d[i]["diff"] = diff;
        d[i]["percent_diff"] = percent_diff;
      }

      //   Sort based on diff
      return d.sort(function(x, y) {
        return d3.ascending(x.diff, y.diff);
      });
    }
  }
};
</script>

<style>
/* Scrollama overwrites */
.scrollama-container {
  display: flex;
}
.scrollama-graphic {
  flex: 1;
  height: 100vh;
}
.scrollama-steps {
  flex: 1;
}

@media only screen and (max-width: 700px) {
  .scrollama-container {
    flex-direction: column;
  }
}

@media only screen and (max-width: 736px) {
  .header-button-block {
    width: 100%;
  }
}
@media only screen and (min-width: 736px) {
  .entry-header .row:first-child {
    flex-wrap: nowrap;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: justify;
}
#nav {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#nav a {
  font-weight: bold;
  font-size: 1.2rem;
}
.my-nav-link:not(:last-child) {
  border-right: 2px solid #666;
  padding-right: 0.25rem;
}
.my-nav-link:not(:first-child) {
  padding-left: 0.25rem;
}
.my-nav-link:hover {
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #f3c613 !important;
}
#nav a,
.my-nav-link {
  color: #2176d2 !important;
}
.my-nav-link:hover {
  color: #0f4d90 !important;
}
.my-card-title {
  font-size: 1.5rem;
  font-weight: 500;
}
.text-link:hover {
  text-decoration: none;
}
.text-link {
  color: #2176d2 !important;
}
.text-link:hover {
  color: #0f4d90 !important;
}
</style>
