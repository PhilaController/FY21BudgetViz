<template>
  <div>
    <Dropdown :options="items" :selected="selectedOption" v-on:updateOption="handleClick"></Dropdown>
  </div>
</template>

<script>
import Dropdown from "./Dropdown";

export default {
  props: ["options", "defaultValue"],
  components: {
    Dropdown
  },
  data: function() {
    return {
      selectedOption: {},
      labels: {
        "2020 (Adopted)": "Adopted FY 2020 Spending Level",
        "2021 (Proposed)": "March 1 Proposal for FY 2021 Spending",
        "2021 (Revised)": "May 1 Proposal for FY 2021 Spending"
      }
    };
  },
  created: function() {
    this.selectedOption = this.items[this.options.indexOf(this.defaultValue)];
    this.$emit("change", this.selectedOption.value);
  },
  computed: {
    items: function() {
      let items = [];
      for (let i = 0; i < this.options.length; i++) {
        items.push({
          id: i,
          value: this.options[i],
          name: this.labels[this.options[i]]
        });
      }
      return items;
    }
  },
  methods: {
    handleClick: function(payload) {
      this.selectedObject = payload;
      this.$emit("change", payload.value);
    }
  }
};
</script>
