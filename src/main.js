import "core-js/stable";
import Vue from "vue";
import App from "@/App";

// make FA does not watch SVG elements
if (window.FontAwesome) window.FontAwesome.config.observeMutations = false;
Vue.config.productionTip = false;

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(`<div id="app"></div>`);


// add download data button and remove the report button
$(".entry-header .btn").first().remove();

// add help message
let helpMessage = `<p class='help-message mt-2'>
  Comments or feedback? Please contact
  <a href="mailto:controller.policy@phila.gov">controller.policy@phila.gov</a>.
  </p>`;
$(".back-link").after(helpMessage);


// mount the app
new Vue({
  render: h => h(App)
}).$mount("#app");