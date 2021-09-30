import { createPinia } from "pinia";
import { createApp, defineComponent, h } from "vue";
import App from "./App.vue";
import axios, { AXIOS } from "./axios";

import router from "./router";
import "./index.css";

import "roboto-fontface/css/roboto/roboto-fontface.css";

import * as mdijs from "@mdi/js";
import mdiVue from "mdi-vue/v3";

createApp(App as any)
  .use(router)
  .use(mdiVue, {
    icons: mdijs,
  })
  .use(createPinia())

  .mount("#app");
