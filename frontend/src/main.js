import PrimeVue from "primevue/config";
import TabMenu from "primevue/tabmenu";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core CSS
import "primevue/resources/themes/saga-blue/theme.css"; //theme
//
console.log(process.env);
createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue)
  .component("TabMenu", TabMenu)
  .mount("#app");
